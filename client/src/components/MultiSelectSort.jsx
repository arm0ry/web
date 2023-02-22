import React, { MouseEventHandler, useCallback, useState } from "react";
import Select, { components as SelectComponents } from "react-select";
// import { ColourOption, colourOptions } from '../data';
import { closestCenter, DndContext } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const MultiValue = (props) => {
  const onMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const innerProps = { ...props.innerProps, onMouseDown };
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.data.value,
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div style={style} ref={setNodeRef} {...attributes} {...listeners}>
      <SelectComponents.MultiValue {...props} innerProps={innerProps} />
    </div>
  );
};

const MultiValueRemove = (props) => {
  return (
    <SelectComponents.MultiValueRemove
      {...props}
      innerProps={{
        onPointerDown: (e) => e.stopPropagation(),
        ...props.innerProps,
      }}
    />
  );
};

const MultiSelectSort = ({
  onChange,
  onBlur,
  value,
  name,
  ref,
  options,
  placeholder,
}) => {

  const onDragEnd = useCallback(
    (event) => {
      const { active, over } = event;

      if (!active || !over) return;

      // onChange((items) => {
      //     console.log({items})
      //   const oldIndex = items.findIndex((item) => item.value === active.id);
      //   const newIndex = items.findIndex((item) => item.value === over.id);
      //   console.log(arrayMove(items, oldIndex, newIndex))
      //   return arrayMove(items, oldIndex, newIndex);
      // });
      const oldIndex = value.findIndex((item) => item.value === active.id);
      const newIndex = value.findIndex((item) => item.value === over.id);
      onChange(arrayMove(value, oldIndex, newIndex));
    },
    [onChange, value]
  );

  return (
    <DndContext
      modifiers={[restrictToParentElement]}
      onDragEnd={onDragEnd}
      collisionDetection={closestCenter}
    >
      <SortableContext
        items={value.map((o) => o.value)}
        strategy={horizontalListSortingStrategy}
      >
        <Select
          classNames={{
            valueContainer: () => "border-none",
            control: (state) =>
              `!bg-gray-50 !border !border-gray-300 !text-gray-900 !text-sm !rounded-lg !p-0.5 ${
                state.isFocused ? " border-blue-500 ring-blue-500" : ""
              }`,
          }}
          ref={ref}
          placeholder={placeholder}
          options={options}
          distance={4}
          //   components={animatedComponents}
          isMulti
          //   options={colourOptions}
          value={value}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          components={{
            // @ts-ignore We're failing to provide a required index prop to SortableElement
            MultiValue,
            MultiValueRemove,
          }}
          closeMenuOnSelect={false}
        />
      </SortableContext>
    </DndContext>
  );
};

export default MultiSelectSort;
