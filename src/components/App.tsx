import { CSSProperties, useState } from 'react';
import { Article } from '../components/article/Article';
import clsx from 'clsx';
import { ArticleParamsForm } from '../components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from '../constants/articleProps';

import styles from '../styles/index.module.scss';

export const App = () => {
	const [articleStyles, setAppState] = useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleStyles.fontFamilyOption.value,
					'--font-size': articleStyles.fontSizeOption.value,
					'--font-color': articleStyles.fontColor.value,
					'--container-width': articleStyles.contentWidth.value,
					'--bg-color': articleStyles.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply={setAppState} onReset={() => {
		setAppState(defaultArticleState)}} />
			<Article />
		</main>
	);
};