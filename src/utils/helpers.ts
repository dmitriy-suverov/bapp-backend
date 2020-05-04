import * as Randomstring from 'randomstring';
import GenerateOptions = Randomstring.GenerateOptions;

export const TEST_RANDOM_STRING = 'random_string';

export const now = () => {
  const currentSeconds = Date.now() / 1000;
  return Math.round(
    process.env.NODE_ENV === 'test'
      ? currentSeconds - process.uptime()
      : currentSeconds,
  );
};

export const random = (options: GenerateOptions) => {
  return process.env.NODE_ENV === 'test'
    ? TEST_RANDOM_STRING
    : Randomstring.generate(options);
};
