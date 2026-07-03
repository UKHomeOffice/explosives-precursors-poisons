'use strict';

const hof = require('hof');
const { jest: jestFromGlobals } = require('@jest/globals');

const isSameArgs = (actualArgs, expectedArgs) => (
  actualArgs.length === expectedArgs.length
  && actualArgs.every((arg, idx) => Object.is(arg, expectedArgs[idx]))
);

const COMPAT_STATE = Symbol('jestCompatState');

const enhanceMock = mockFn => {
  if (!mockFn || mockFn[COMPAT_STATE]) {
    return mockFn;
  }

  const state = {
    baseImpl: mockFn.getMockImplementation(),
    withArgsRules: []
  };

  Object.defineProperty(mockFn, COMPAT_STATE, {
    value: state,
    configurable: false,
    enumerable: false,
    writable: false
  });

  Object.defineProperty(mockFn, 'called', {
    configurable: true,
    get() {
      return mockFn.mock.calls.length > 0;
    }
  });

  Object.defineProperty(mockFn, 'calledOnce', {
    configurable: true,
    get() {
      return mockFn.mock.calls.length === 1;
    }
  });

  Object.defineProperty(mockFn, 'calledWith', {
    configurable: true,
    value(...args) {
      return mockFn.mock.calls.some(call => isSameArgs(call, args));
    }
  });

  Object.defineProperty(mockFn, 'calledOnceWith', {
    configurable: true,
    value(...args) {
      return mockFn.calledOnce && mockFn.calledWith(...args);
    }
  });

  Object.defineProperty(mockFn, 'withArgs', {
    configurable: true,
    value(...expectedArgs) {
      const addRule = impl => {
        state.withArgsRules.push({ args: expectedArgs, impl });
        mockFn.mockImplementation((...actualArgs) => {
          for (const rule of state.withArgsRules) {
            if (isSameArgs(actualArgs, rule.args)) {
              return rule.impl(...actualArgs);
            }
          }

          if (typeof state.baseImpl === 'function') {
            return state.baseImpl(...actualArgs);
          }

          return undefined;
        });

        return mockFn;
      };

      return {
        mockReturnValue: value => addRule(() => value),
        mockResolvedValue: value => addRule(() => Promise.resolve(value)),
        mockRejectedValue: error => addRule(() => Promise.reject(error)),
        mockImplementation: impl => addRule(impl)
      };
    }
  });

  return mockFn;
};

const patchJestTarget = target => {
  if (!target || typeof target.fn !== 'function' || typeof target.spyOn !== 'function') {
    return;
  }

  if (target.__jestCompatPatched) {
    return;
  }

  const originalJestFn = target.fn.bind(target);
  const originalSpyOn = target.spyOn.bind(target);

  const setJestMethod = (name, impl) => {
    try {
      Object.defineProperty(target, name, {
        configurable: true,
        writable: true,
        value: impl
      });
    } catch (err) {
      target[name] = impl;
    }
  };

  setJestMethod('fn', (...args) => enhanceMock(originalJestFn(...args)));
  setJestMethod('spyOn', (...args) => enhanceMock(originalSpyOn(...args)));

  Object.defineProperty(target, '__jestCompatPatched', {
    configurable: true,
    enumerable: false,
    writable: false,
    value: true
  });
};

patchJestTarget(jest);
patchJestTarget(global.jest);
patchJestTarget(globalThis.jest);
patchJestTarget(jestFromGlobals);

global.mockFn = (...args) => enhanceMock(jest.fn(...args));
global.mockSpyOn = (...args) => enhanceMock(jest.spyOn(...args));

global.reqres = hof.utils.reqres;
