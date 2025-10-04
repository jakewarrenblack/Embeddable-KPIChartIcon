import { defineOption, defineType } from '@embeddable.com/core';
import { Position } from '../enums/Position';

const PositionType = defineType('position', {
  label: 'Position',
  optionLabel: (position: string) => position,
});

defineOption(PositionType, Position.TOP_LEFT);
defineOption(PositionType, Position.TOP_RIGHT);
defineOption(PositionType, Position.LEFT);
defineOption(PositionType, Position.RIGHT);
defineOption(PositionType, Position.BOTTOM_LEFT);
defineOption(PositionType, Position.BOTTOM_RIGHT);

export default PositionType;