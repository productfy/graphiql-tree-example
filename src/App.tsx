import '@productfy/graphiql-tree/dist/build.css';
import '@productfy/graphiql-tree/dist/GraphiQLWithTree.css';
import 'rc-tooltip/assets/bootstrap.css';

import { useRef, useState } from 'react';

import Curl from './snippets/Curl';
import type { DefaultValueCustomizer } from '@productfy/graphiql-tree';
import type { FetcherParams } from '@graphiql/toolkit';
import GraphiQLWithTree from '@productfy/graphiql-tree/dist/GraphiQLWithTree';
import HttpJson from './snippets/HttpJson';
import { buildSchema } from 'graphql';
import raw from 'raw.macro';
import styles from './index.module.scss';

const schemaSdl = raw('./schema.docs.graphql');
const serverUrl = 'https://api.github.com/graphql';

const App = () => {
  const abortController = useRef<AbortController>(new AbortController());
  const [token, setToken] = useState<string>('');

  const customizeDefaultValue: DefaultValueCustomizer = (_arg, _parentDefinition) => {
    return undefined;
  };

  const fetcher = async (graphQLParams: FetcherParams) => {
    const response = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify(graphQLParams),
      signal: abortController.current.signal,
    });
    return response.json().catch(() => response.text());
  };

  /**
   * You can customize a node by passing in node customization handler.
   *
   * The following is an example where we use custom enums (that differs from GraphQL enums)
   * that we download, and if the node matches the custom enum, we display a dropdown with values
   * from that enum.
   *
   * Note that returning undefined will fallback to default node handlers
   */

  // const customizeNode = ({
  //   isRequired = false,
  //   name,
  //   onEdit,
  //   type,
  //   value,
  // }: NodeCustomizerParams) => {
  //   const unwrappedType = graphqlHelper.unwrapType(type);
  //   const productfyEnum = enums.find(({ left }) => left === unwrappedType.name);

  //   if (isScalarType(unwrappedType) && productfyEnum) {
  //     const onEditInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //       const nextValueNode = {
  //         kind: 'StringValue',
  //         value: e.target.value,
  //       } as StringValueNode;
  //       onEdit(value, nextValueNode);
  //     };
  //     const options = productfyEnum.right.sort((a, b) => a.code.localeCompare(b.code));

  //     return (
  //       <div className={classnames('cm-string', styles.select)}>
  //         <select name={name} onChange={onEditInput} value={(value as StringValueNode).value || ''}>
  //           <option value="" disabled={isRequired} hidden={isRequired}></option>
  //           {options
  //             .sort((a, b) => (a.description || '').localeCompare(b.description || ''))
  //             .map(({ code, description }) => (
  //               <option key={code} value={code}>
  //                 {code} - {description}
  //               </option>
  //             ))}
  //         </select>
  //       </div>
  //     );
  //   }
  // };

  return (
    <>
      <div className={styles.githubToken}>
        <label>
          GitHub Token
          <input type="text" onChange={e => setToken(e.target.value)} value={token} />
        </label>
      </div>
      <GraphiQLWithTree
        customizeDefaultValue={customizeDefaultValue}
        // customizeNode={customizeNode}
        fetcher={fetcher}
        schema={buildSchema(schemaSdl)}
        serverUrl={serverUrl}
        snippets={[Curl, HttpJson]}
      />
    </>
  );
};

export default App;
