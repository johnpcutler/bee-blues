import classnames from 'classnames';
import React from 'react';
import modes from './modes';

const BLANK = '________________';
const SEPARATOR = '__BLANK__';

function getValues(mode, { examples, prompts, source }) {
  let values = [];
  switch (mode) {
    case modes.blanks:
    default:
      values = source.match(/__BLANK__/g).map(() => BLANK);
      break;
    case modes.examples:
      values = examples;
      break;
    case modes.input:
      break;
    case modes.prompts:
      values = prompts;
      break;
  }
  return values;
}

function interpolate(mode, source, values) {
  const text = source.slice();
  const parts = text.split(SEPARATOR);
  const result = [];
  parts.forEach((part, index) => {
    result.push(part);
    if (values[index]) {
      const element = (
        <span
          className={classnames({
            'bg-blue-200': mode === modes.prompts,
            'bg-green-200': mode === modes.examples,
            'bg-yellow-200': mode === modes.blanks
          })}
          key={index}
        >
          {values[index]}
        </span>
      );
      result.push(element);
    }
  });
  return result;
}

function Content({ mode, model }) {
  const values = getValues(mode, model);
  return interpolate(mode, model.source, values);
}

export default Content;
