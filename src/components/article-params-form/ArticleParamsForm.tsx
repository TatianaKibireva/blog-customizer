import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import clsx from 'clsx';

export const ArticleParamsForm = ({
	onApply,
	onReset,
}: {
	onApply: (state: ArticleStateType) => void;
	onReset: () => void;
}) => {
	const [isOpenForm, setIsOpenForm] = useState(false);
	const [fontFamilyOption, setFontFamilyOption] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontSizeOption, setFontSizeOption] = useState(
		defaultArticleState.fontSizeOption
	);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	const toggleForm = () => {
		setIsOpenForm(!isOpenForm);
	};

	// отправка формы при нажатии "применить"
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply({
			fontFamilyOption,
			fontSizeOption,
			fontColor,
			backgroundColor,
			contentWidth,
		});
	};

	// сброс формы при нажатии "Сбросить"
	const handleFormReset = () => {
		setFontFamilyOption(defaultArticleState.fontFamilyOption);
		setFontSizeOption(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		onReset();
	};

const formRef = useRef<HTMLDivElement>(null)
const arrowButtonRef = useRef<HTMLDivElement>(null)

useEffect(() => {
	if (!isOpenForm) return

	const handleClickOutside = (event: MouseEvent) => {
		if (arrowButtonRef.current?.contains(event.target as Node) || 
				formRef.current?.contains(event.target as Node)) 
				{
			return;
		}
		setIsOpenForm(false)
	}
	document.addEventListener('mousedown', handleClickOutside);
	return () => {
		document.removeEventListener('mousedown', handleClickOutside)
	}
}, [isOpenForm])

	return (
		<>
			<div ref={arrowButtonRef}>
			<ArrowButton isOpen={isOpenForm} onClick={toggleForm}/>
			</div>
			{isOpenForm && (<div className={styles.overlay} onClick={() => setIsOpenForm(false)} />)}
			<aside ref={formRef} className={clsx(styles.container, isOpenForm && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleFormReset}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Select
						options={fontFamilyOptions}
						selected={fontFamilyOption}
						placeholder='Open Sans'
						onChange={setFontFamilyOption}
						title='Шрифт'
					/>
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={fontSizeOption}
						onChange={setFontSizeOption}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={fontColor}
						placeholder='Черный'
						onChange={setFontColor}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={backgroundColor}
						placeholder='Белый'
						onChange={setBackgroundColor}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={contentWidth}
						placeholder='Широкий'
						onChange={setContentWidth}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
