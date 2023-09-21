import classNames from "classnames";
import BaseCheckbox from "components/baseCheckbox/baseCheckbox";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { t } from "i18next";
import { IColumnVisibility } from "redux/models/reportModels";
import { StringResources } from "utils/language/languageResource";
import ColumnContentUnsavedChanges from "../columnContentUnsavedChanges/columnContentUnsavedChanges";
import "./columnContentBody.scss";
import BaseButton from "components/baseButton/baseButton";

interface IColumnContentBodyProps {
    onSelectAllClick: () => void;
    resetToDefaultClick: () => void;
    onColumnSwitchToggle: (id: string, checked: boolean) => void;
    localColumnVisibility: IColumnVisibility[];
    unsavedChangesExists: boolean;
}

const ColumnContentBody = (props: IColumnContentBodyProps) => {
    const isSelectAllChecked = props.localColumnVisibility.every(x => x.visible);
    return (
        <>
            <div className="column-content__columns">
                {props.unsavedChangesExists && (
                    <div className="column-content__columns__unsaved-changes">
                        <ColumnContentUnsavedChanges />
                    </div>
                )}
                <Droppable droppableId="columnChooser">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={classNames({ "column-content__columns--dragging": snapshot.isDraggingOver })}
                        >
                            <div className="column-content__columns__select-all">
                                <BaseCheckbox
                                    id="selectAll"
                                    label={`${t(StringResources.columnChooser.selectAll)}`}
                                    checked={isSelectAllChecked}
                                    onChange={props.onSelectAllClick}
                                />
                                <BaseButton
                                    handleClick={props.resetToDefaultClick}
                                    text={`${t(StringResources.columnChooser.defaultView)}`}
                                    styleType={"text"}
                                    size="small"
                                />
                            </div>
                            {props.localColumnVisibility &&
                                props.localColumnVisibility.map((row, index) => {
                                    return (
                                        <Draggable key={row.id} draggableId={row.id} index={index}>
                                            {provided => (
                                                <div ref={provided.innerRef} {...provided.draggableProps}>
                                                    <BaseCheckbox
                                                        id={row.id}
                                                        label={String(row.label)}
                                                        checked={row.visible ?? false}
                                                        isReorderable={true}
                                                        draggableHandleProps={provided.dragHandleProps}
                                                        onChange={props.onColumnSwitchToggle}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    );
                                })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </>
    );
};

export default ColumnContentBody;
