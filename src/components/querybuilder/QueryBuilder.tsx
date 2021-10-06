import { throttle } from "lodash";
import React, { useState } from "react";
import { Builder, Utils as QbUtils, Query } from "react-awesome-query-builder/lib";
// types
import { BuilderProps, Config, ImmutableTree, JsonGroup } from "react-awesome-query-builder/lib";
// or import "react-awesome-query-builder/css/antd.less";
// For Material-UI widgets only:
import MaterialConfig from "react-awesome-query-builder/lib/config/material";

import Operators from "./Operators";

// For AntDesign widgets only:
//import AntdConfig from "react-awesome-query-builder/lib/config/antd";
import "antd/dist/antd.css";
import "react-awesome-query-builder/lib/css/compact_styles.css";
import "react-awesome-query-builder/lib/css/styles.css";

//optional, for more compact styles
// = {...InitialConfig.operators, ...Operators};

// You need to provide your own config. See below 'Config format'


type QueryBuilderPropTypes = {
  onFilterChange: (tree: ImmutableTree) => any;
  config: Config;
  tree : ImmutableTree;
}


export default function QueryBuilder(props: QueryBuilderPropTypes) {
/*   const [state, setState] = useState({
    tree: QbUtils.checkTree(props.tree, props.config),
    config: props.config
  }); */

  const onChange = (immutableTree: ImmutableTree, config: Config) => {
    // Tip: for better performance you can apply `throttle` - see `examples/demo`
    //setState({ tree: immutableTree, config: config }); 

   updateResult(immutableTree, config)
  };

  const updateResult = throttle((immutableTree: ImmutableTree, config : Config) => {

    props.onFilterChange(immutableTree); 
  }, 100)
  
  const renderBuilder = (props: BuilderProps) => (
    <div className="query-builder-container" style={{ padding: "10px" }}>
      <div className="query-builder qb-lite">
        <Builder {...props} />
      </div>
    </div>
  );

  return (
    <div>
      <Query
        {...props.config}
        value={props.tree}
        onChange={onChange}
        renderBuilder={renderBuilder}
        
      />
    </div>
  );
};
