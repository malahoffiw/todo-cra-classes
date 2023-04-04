import { HiOutlineArchiveBox } from 'react-icons/hi2';
import { RiTodoLine } from 'react-icons/ri';
import { MdDone } from 'react-icons/md';

export const pages = [
  { name: 'Archive', icon: <HiOutlineArchiveBox />, active: false },
  { name: 'Active', icon: <RiTodoLine />, active: true },
  { name: 'Done', icon: <MdDone />, active: false },
];
