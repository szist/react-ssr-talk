import _ from "lodash";
import assets from "./configs/assets";
import babel from "./configs/babel";
import dev from "./configs/dev";
import globals from "./configs/globals";
import output from "./configs/output";
import publicDir from "./configs/publicDir";
import resolve from "./configs/resolve";
import styles from "./configs/styles";
import entries from "./configs/entries";
import optimization from "./configs/optimization";

function concatArrays(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
  return undefined;
}

export default function makeConfig(options) {
  return _.mergeWith(
    {},
    assets(options),
    dev(options), // contains eslint loader for dev, has to come before babel
    babel(options),
    globals(options),
    output(options),
    resolve,
    styles(options),
    entries(options),
    publicDir(options),
    optimization(options),
    /* customizer */ concatArrays
  );
}
