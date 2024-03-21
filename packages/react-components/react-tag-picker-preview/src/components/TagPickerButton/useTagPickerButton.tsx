import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import { ChevronDownRegular as ChevronDownIcon } from '@fluentui/react-icons';
import { useActiveDescendantContext } from '@fluentui/react-aria';
import type { TagPickerButtonProps, TagPickerButtonState } from './TagPickerButton.types';
import { useTagPickerContext_unstable } from '../../contexts/TagPickerContext';
import { useButtonTriggerSlot } from '../../utils/useButtonTriggerSlot';

/**
 * Create the state required to render PickerButton.
 *
 * The returned state can be modified with hooks such as usePickerButtonStyles_unstable,
 * before being passed to renderPickerButton_unstable.
 *
 * @param props - props from this instance of PickerButton
 * @param ref - reference to root HTMLDivElement of PickerButton
 */
export const useTagPickerButton_unstable = (
  props: TagPickerButtonProps,
  ref: React.Ref<HTMLButtonElement>,
): TagPickerButtonState => {
  const { controller: activeDescendantController } = useActiveDescendantContext();
  const {
    triggerRef,
    getOptionById,
    open,
    selectOption,
    setHasFocus,
    setOpen,
    multiselect,
    value,
    popoverId,
    hasSelectedOption,
  } = usePickerContext();
  const root = useButtonTriggerSlot(props, triggerRef as React.RefObject<HTMLButtonElement>, {
    activeDescendantController,
    defaultProps: {
      type: 'button',
      tabIndex: 0,
      children: value || props.placeholder,
      'aria-controls': open ? popoverId : undefined,
      ref,
    },
    state: {
      getOptionById,
      open,
      selectOption,
      setHasFocus,
      setOpen,
      multiselect,
    },
  });

  const size = useTagPickerContext_unstable(ctx => ctx.size);

  const state: TagPickerButtonState = {
    components: {
      root: 'button',
      expandIcon: 'span',
    },
    root,
    expandIcon: slot.optional(props.expandIcon, {
      renderByDefault: true,
      defaultProps: {
        children: <ChevronDownIcon />,
      },
      elementType: 'span',
    }),
    size,
    hasSelectedOption,
  };

  return state;
};

function usePickerContext() {
  return {
    triggerRef: useTagPickerContext_unstable(ctx => ctx.triggerRef),
    clearSelection: useTagPickerContext_unstable(ctx => ctx.clearSelection),
    getOptionById: useTagPickerContext_unstable(ctx => ctx.getOptionById),
    open: useTagPickerContext_unstable(ctx => ctx.open),
    selectOption: useTagPickerContext_unstable(ctx => ctx.selectOption),
    selectedOptions: useTagPickerContext_unstable(ctx => ctx.selectedOptions),
    setHasFocus: useTagPickerContext_unstable(ctx => ctx.setHasFocus),
    setOpen: useTagPickerContext_unstable(ctx => ctx.setOpen),
    setValue: useTagPickerContext_unstable(ctx => ctx.setValue),
    multiselect: useTagPickerContext_unstable(ctx => ctx.multiselect),
    value: useTagPickerContext_unstable(ctx => ctx.value),
    popoverId: useTagPickerContext_unstable(ctx => ctx.popoverId),
    hasSelectedOption: useTagPickerContext_unstable(ctx => ctx.selectedOptions.length > 0),
  };
}