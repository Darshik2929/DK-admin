import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ReactComponent as DownIcon } from "../../Assets/chevron-down.svg";

export default function Dropdown(props) {
    const { label, placeholder, menuItem = [] } = props;

    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelect = (data) => {
        if (selectedItems.flatMap((el) => el.value).includes(data.value)) {
            setSelectedItems(selectedItems.filter((item) => item.value !== data.value));
            props.setSelectedItems(selectedItems.filter((item) => item.value !== data.value));
        } else {
            setSelectedItems([...selectedItems, data]);
            props.setSelectedItems([...selectedItems, data]);
        }
    };

    return (
        <div className="w-full">
            <label htmlFor="" className="">
                {label}
            </label>

            <Menu as="div" className="relative inline-block text-left w-full pt-1">
                <div>
                    <Menu.Button className="inline-flex w-full border border-neutral-300 py-2.5 px-4 rounded-md text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 justify-between">
                        <div className="text-neutral-300 pt-1">{placeholder}</div>

                        <DownIcon />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute left-0 mt-2 w-full z-10 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="px-1 py-1">
                            {menuItem.map((el, index) => {
                                const isSelected = selectedItems.flatMap((el) => el.value).includes(el.value) || props.selectedItems.flatMap((el) => el.value).includes(el.value);

                                return (
                                    <Menu.Item
                                        as={"div"}
                                        className={`pl-4 py-2 cursor-pointer flex items-center ${isSelected ? "bg-blue-500 text-white" : "text-gray-900"}`}
                                        onClick={() => handleSelect(el)}
                                        key={index}
                                    >
                                        <input type="checkbox" className="mr-2" checked={isSelected} readOnly />
                                        {el.label}
                                    </Menu.Item>
                                );
                            })}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}
