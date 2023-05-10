/** @jsxImportSource react */
import { Sandpack } from "@codesandbox/sandpack-react";

export const Active = {
  HTML: 'html',
  CSS: 'css',
};

export default function ComponentSandpack({
  html,
  css,
  hiddenCss = '',
  height = 230,
  files = {},
  dependencies = {},
  active = Active.HTML,
  ...props
}) {
  const importPaths = [
    'media-chrome',
    './styles.css',
    ...Object.keys(dependencies),
    ...Object.keys(files).reduce((importPaths, fileAbsPath) => {
      // Only automatically import .css or .js files for now
      if (fileAbsPath.endsWith('.css') | fileAbsPath.endsWith('.js')) {
        importPaths.push(`.${fileAbsPath}`);
      }
      return importPaths;
    }, css ? ['./custom-styles.css'] : [])
  ];
  return (
    <div style={{ marginTop: '1rem', height }}>
      <Sandpack
        template="vanilla"
        theme="auto"
        options={{
          editorHeight: height,
          editorWidthPercentage: 50,
        }}
        customSetup={{
          dependencies: {
            'media-chrome': 'canary',
            ...dependencies
          },
        }}
        files={{
          "/index.html": {
            active: active === Active.HTML,
            code: `${html}`
          },
          '/index.js': {
            code: importPaths.map(path => `import '${path}';`).join(' '),
            hidden: true,
          },
          '/styles.css': {
            code: `media-controller,
video {
  width: 100%;
  aspect-ratio: 2.4;
}
${hiddenCss}`,
            hidden: true,
          },
          ...(css ? {'/custom-styles.css': {
            active: active === Active.CSS,
            code: `${css}`
          }} : {}),
          ...files
        }}
        {...props}
      />
    </div>
  )
}