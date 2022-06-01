import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import { prepareMarkdown } from 'docs/src/modules/utils/parseMarkdown';

const pageFilename = 'getting-started/supported-components';
const requireDemo = require.context(
  'docs/src/pages/getting-started/supported-components',
  false,
  /\.(js|tsx)$/,
);
const requireRaw = require.context(
  '!raw-loader!../../src/pages/getting-started/supported-components',
  false,
  /\.(js|md|tsx)$/,
);

export default function Page({ demos, docs }) {
  return <MarkdownDocs demos={demos} docs={docs} requireDemo={requireDemo} />;
}

Page.getInitialProps = () => {
  const { demos, docs } = prepareMarkdown({ pageFilename, requireRaw });
  return { demos, docs };
};
