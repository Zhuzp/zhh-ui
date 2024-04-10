const path = require('path')
module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@assets': path.join(__dirname, '../', 'assets/'),
      '@src': path.join(__dirname, '../', 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      //模块规则
			//编译ts、tsx文件
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader',
				options: {
					getCustomTransformers: () => ({
						before: [
							// tsImportPluginFactory({
							// 	//配置antd组件库按需加载
							// 	libraryName: 'antd',
							// 	libraryDirectory: 'lib',
							// 	style: 'css',
							// }),
						],
					}),
				},
				exclude: /node_modules/,
			},
			//这几个都是css,loader
			{
				test: /\.css$/,
				use: 'style-loader!css-loader',
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
				exclude: /node_modules/,
			},
			//这个file-loader，暂时不用就去掉吧
			{
				test: /\.(jpg|png|svg|ico|icns)$/,
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]',
				},
			},
    ],
  },
};

