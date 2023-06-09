# REACT-TS-BASIC
---
# 1.Creating a project with webpack:

### 1.1: Create a package.json:
        {
            "name": "my-app",
            "description": "My React and TypeScript app",
            "version": "0.0.1"
        }
### 1.2: Adding TypeScript:
        npm install --save-dev typescript
### 1.3: Create a TypeScript configuration file:    
    1.3.1: Create a file called tsconfig.json:
        {
            "compilerOptions": {
                "noEmit": true,
                "lib": [
                        "dom",
                        "dom.iterable",
                        "esnext"
                    ],
                "moduleResolution": "node",
                "allowSyntheticDefaultImports": true,
                "esModuleInterop": true,
                "jsx": "react",
                "forceConsistentCasingInFileNames": true,
                "strict": true
            },
            "include": ["src"],
            "exclude": ["node_modules", "dist"]
        }

        - noEmit: true suppresses the TypeScript compiler from doing any transpilation;
        - allowSyntheticDefaultImports and esModuleInterop:  to true allows React to be imported as a default import, like the following:

                    import React from 'react'

                without these settings set to true, React would have to be imported like this:

                    import * as React from 'react'
### 1.4: Adding React: 
    1.4.1: npm install react react-dom
    1.4.2: npm install --save-dev @types/react @types/react-dom
### 1.5: Adding Babel: 
    1.5.1: npm install --save-dev @babel/core
    1.5.2: npm i -D @babel/core
    1.5.3: npm i -D @babel/preset-env
    1.5.4: npm i -D @babel/preset-react
    1.5.5: npm i -D @babel/preset-typescript
    1.5.6: npm i -D @babel/plugin-transform-runtime @babel/runtime
    1.5.7: Create file .babelrc.json.

        {
            "presets": [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript"
            ],
            "plugins": [
                [
                    "@babel/plugin-transform-runtime",
                    {
                    "regenerator": true
                    }
                ]
            ]
        }
### 1.6: Adding webpack: 
    1.6.1: npm i -D webpack webpack-cli
    1.6.2: npm i -D webpack-dev-server
    1.6.3: npm i -D babel-loader
    1.6.4: npm i -D html-webpack-plugin
    1.6.5: 
         1.6.5.1: Install a library called ts-node, which allows the configuration to be defined in a TypeScript file:
            npm i -D ts-node
        1.6.5.2: The configure file starts with various import statements and a type for the configuration object:

            import path from 'path';
            import HtmlWebpackPlugin from 'html-webpack-plugin';
            import {
                Configuration as WebpackConfig,
                HotModuleReplacementPlugin,
            } from 'webpack';
            import {
                Configuration as WebpackDevServerConfig
            } from 'webpack-dev-server';
            type Configuration = WebpackConfig & {
                devServer?: WebpackDevServerConfig;
            }

            - The path node library will tell webpack where to place the bundle.
            - HtmlWebpackPlugin will be used to create index.html.
            -  The webpack configuration TypeScript types come from both the webpack and webpackdev-
            server packages. So, we combine them using an intersect type, creating a type
            called Configuration

        1.6.5.3: The configuration object is then defined as follows:

            const config: Configuration = {
                mode: 'development',
                output: {
                    publicPath: '/',
                },
                entry: './src/index.tsx',
                ...
            };
            export default config;
            
            - The mode property tells webpack the configuration is for development, meaning that the
            React development tools are included in the bundle
            - The output.publicPath property is the root path in the app, which is important for
            deep linking in the dev server to work correctly
            - The entry property tells webpack where the React app’s entry point is, which is index.
            tsx in our project
            - Webpack expects the configuration object to be a default export, so we export the config
            object as a default export

        1.6.5.4: Further configuration is highlighted by the following code:

        const config: Configuration = {
            ...,
            module: {
                rules: [
                    {
                        test: /\.(ts|js)x?$/i,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env', '@babel/
                                preset-react', '@babel/preset-typescript'],
                            },
                        },
                    },
                ],
            },
            resolve: {
                extensions: ['.tsx', '.ts', '.js'],
            }
        }

        - The module property informs webpack how different modules should be processed. We need
        to tell webpack to use babel-loader for files with .js, .ts, and .tsx extensions.
        - The resolve.extensions property tells webpack to look for TypeScript files and JavaScript
        files during module resolution.

    1.6.5.5: A couple of plugins are defined:
    
        const config: Configuration = {
        ...,
            plugins: [
                new HtmlWebpackPlugin({
                    template: 'src/index.html',
                }),
                new HotModuleReplacementPlugin(),
            ]
        };

        - As mentioned earlier, HtmlWebpackPlugin creates the HTML file. It has been configured
        to use index.html in the src folder as a template.
        - HotModuleReplacementPlugin allows modules to be updated while an application is
        running, without a full reload.

    1.6.5.6: the following properties complete the configuration:
        const config: Configuration = {
            ...,
            devtool: 'inline-source-map',
            devServer: {
                static: path.join(__dirname, 'dist'),
                historyApiFallback: true,
                port: 4000,
                open: true,
                hot: true,
            }   
        };

        - The devtool property tells webpack to use full inline source maps, which allow the original
        source code to be debugged before transpilation.
        -The devServer property configures the webpack development server. It configures the web
        server root to be the dist folder and to serve files on port 4000. Now, historyApiFallback
        is required for deep links to work, and we have also specified to open the browser after the
        server has been started.

    1.6.5.7: package.json and add a scripts section with a start script:

        {
            ...,
            "scripts": {
                "start": "webpack serve --config webpack.dev.config.
                ts"
            }
        }

---        
# 2.Creating a project with Create React App:
###    2.1. npx create-react-app myapp --template typescript

--- 
 # 3.Creating a React and TypeScript component:
###    3.1. Adding a props type:

        type Props = {
            type?: string;
            heading: string;
            children: React.ReactNode;
            closable?: boolean;
            onClose?: () => void;
        };

        - The heading and children props are required but the rest of the props are optional.
        - The children prop is given a special type called React.ReactNode. This allows it to
        accept JSX elements as well as strings.