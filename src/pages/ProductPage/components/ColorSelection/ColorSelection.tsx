import { NavLink, useLocation } from 'react-router-dom';
import nextId from 'react-id-generator';
import { updateCurrentProductColor } from '../../../../store/reducers/productInformationSlice';
import { useAppSelector, useAppDispatch } from '../../../../hooks/hooks';
import './ColorSelection.scss';

const ColorSelection = () => {
    const colorDtoList = useAppSelector(
        (state) => state.productInformation.productInfo.colors
    );
    const currentColor = useAppSelector(
        (state) => state.productInformation.currentColor
    );
    const dispatch = useAppDispatch();
    const currentPath = useLocation().pathname;

    return (
        <div className="color-selection">
            <span className="color-selection__color-descr">
                Колір: <span>{currentColor?.name}</span>
            </span>
            <ul className="color-selection__list">
                {colorDtoList.map((color) => {
                    const { id, name } = color;
                    return (
                        <li
                            className="color-selection__item"
                            key={nextId('product-color')}
                        >
                            <NavLink
                                className={`color-selection__link ${
                                    currentColor?.id === id ? 'active-link' : ''
                                }`}
                                to={`${currentPath}${id}`}
                                style={{ backgroundColor: `${id}` }}
                                onClick={() => {
                                    dispatch(
                                        updateCurrentProductColor({
                                            name,
                                            id,
                                        })
                                    );
                                    localStorage.setItem('hex', id);
                                    localStorage.setItem('colorName', name);
                                }}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ColorSelection;
