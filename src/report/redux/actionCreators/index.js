import { default as syncCreator } from './sync';
import { default as fetchCreator } from './fetchApi';
import { default as versionCreator } from './version';
import { default as importCreator } from './importData';
import { default as selectionCreator } from './selections';

export { Types } from './fetchApi';
export { VersionTypes } from './version';
export { importDataTypes } from './importData';
export { syncTypes } from './sync';
export { selectionTypes } from './selections';

export default {
  ...fetchCreator,
  ...versionCreator,
  ...importCreator,
  ...syncCreator,
  ...selectionCreator
}
