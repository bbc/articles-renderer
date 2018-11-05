// import React from 'react';
import localiseTimestamp from './index';
// import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';

const testTimestamp = 1517403600000; // 31/01/2018 - 13:00:00 UTC
const testTimestampFourHoursAhead = 1517418000000; // 31/01/2018 - 17:00:00 UTC

const persianDateAsCharArray = [
  '۱',
  '۱',
  ' ',
  'ب',
  'ه',
  'م',
  'ن',
  ' ',
  '۱',
  '۳',
  '۹',
  '۶',
]; // 11 bahman 1396

const englishAbsoluteExpectedOutput = '31 January 2018';
const englishRelativeExpectedOutput = '4 hours ago';
const persianAbsoluteExpectedOutput = persianDateAsCharArray
  .join('')
  .toString();
// const persianRelativeExpectedOutput = '۴ ساعت پیش';
const persianRelativeExpectedOutputWithLatinNumbers = '4 ساعت پیش';

const testLocalisedTimestamp = (locale, expected, relative = false) => {
  let output = '';
  if (relative) {
    output = localiseTimestamp(
      testTimestamp,
      locale,
      testTimestampFourHoursAhead,
    );
  } else {
    output = localiseTimestamp(testTimestamp, locale);
  }

  expect(output).toEqual(expected);
};

describe('LocalisedTimestamp', () => {
  // describe('Snapshots to ensure DOM markup', () => {
  //   shouldMatchSnapshot(
  //     'should render correctly for English absolute timestamp',
  //     <LocalisedTimestamp timestamp={testTimestamp} locale="en-gb" />,
  //   );
  //   shouldMatchSnapshot(
  //     'should render correctly for English relative timestamp',
  //     <LocalisedTimestamp
  //       timestamp={testTimestamp}
  //       locale="en-gb"
  //       relativeTimestamp={testTimestampFourHoursAhead}
  //     />,
  //   );
  //   shouldMatchSnapshot(
  //     'should render correctly for Persian absolute timestamp',
  //     <LocalisedTimestamp timestamp={testTimestamp} locale="fa" />,
  //   );
  //   shouldMatchSnapshot(
  //     'should render correctly for Persian relative timestamp',
  //     <LocalisedTimestamp
  //       timestamp={testTimestamp}
  //       locale="fa"
  //       relativeTimestamp={testTimestampFourHoursAhead}
  //     />,
  //   );
  // });

  describe('Static assertions to ensure timestamp format', () => {
    it('should render an english absolute date in the format D MMM YYYY', () => {
      testLocalisedTimestamp('en', englishAbsoluteExpectedOutput);
    });

    it('should render an english relative date in the format D MMM YYYY', () => {
      testLocalisedTimestamp('en', englishRelativeExpectedOutput, true);
    });

    it('should render an persian absolute date in the format D MMM YYYY', () => {
      testLocalisedTimestamp('fa', persianAbsoluteExpectedOutput);
    });

    it('should render an persian relative date in the format D MMM YYYY', () => {
      testLocalisedTimestamp(
        'fa',
        persianRelativeExpectedOutputWithLatinNumbers,
        true,
      );
    });
  });
});
