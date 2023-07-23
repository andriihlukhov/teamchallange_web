import nextId from 'react-id-generator';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
    fetchCatalogProductsByFilters,
    updateCurrentProductCategory,
} from '../../../../store/reducers/catalogFilterSlice';
import { useAppDispatch } from '../../../../hooks/hooks';
import './Category.scss';

type CategoryType = {
    id: string;
    name: string;
    categoryImagePath: string;
    categoryNameDtos: { id: string; name: string }[];
};

const Category = ({ category }: { category: CategoryType }) => {
    const [isSubCategoriesHide, setIsSubCategoriesHide] = useState<boolean>();
    const { id, name, categoryImagePath, categoryNameDtos } = category;

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (categoryNameDtos.length > 3) {
            setIsSubCategoriesHide(true);
        } else {
            setIsSubCategoriesHide(false);
        }
    }, [categoryNameDtos]);

    const showHideBtn = () => {
        let button;
        if (categoryNameDtos.length > 3) {
            button = (
                <li className="category-card__subcategories-btn">
                    <button
                        className="category-card__show-btn"
                        type="button"
                        onClick={() =>
                            setIsSubCategoriesHide(!isSubCategoriesHide)
                        }
                    >
                        {isSubCategoriesHide ? 'Показати всі' : 'Згорнути'}
                    </button>
                </li>
            );
        }
        return button;
    };

    return (
        <div className="categories-page__card category-card">
            <NavLink
                className="category-card__img-link"
                to={`/catalog/${name}`}
                onClick={() => dispatch(updateCurrentProductCategory(id))}
            >
                <img
                    className="category-card__img"
                    width={304}
                    height={200}
                    src={categoryImagePath}
                    alt={name}
                />
            </NavLink>
            <div className="category-card__content">
                <NavLink
                    className="category-card__main-link"
                    to={`/catalog/${name}`}
                    onClick={() => dispatch(updateCurrentProductCategory(id))}
                >
                    {name}
                </NavLink>
                <ul
                    className={`category-card__subcategories-list ${
                        isSubCategoriesHide ? 'hide' : ''
                    }`}
                >
                    {categoryNameDtos.map((subcategory) => {
                        return (
                            <li
                                className="category-card__subcategories-item"
                                key={nextId('subcategory-link')}
                            >
                                <a
                                    className="category-card__subcategories-link"
                                    href="/"
                                >
                                    {subcategory.name}
                                </a>
                            </li>
                        );
                    })}
                    {showHideBtn()}
                </ul>
            </div>
        </div>
    );
};

export default Category;
