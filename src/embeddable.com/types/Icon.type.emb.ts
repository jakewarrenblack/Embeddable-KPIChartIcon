import { defineOption, defineType } from '@embeddable.com/core';
import { iconNames } from 'lucide-react/dynamic.mjs';

const IconNameType = defineType('iconName', {
  label: 'Icon Name',
  optionLabel: (iconName: string) => iconName,
});

iconNames.forEach((iconName) => {
  defineOption(IconNameType, iconName);
});

export default IconNameType;
