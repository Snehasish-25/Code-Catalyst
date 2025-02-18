import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";

const categories = [
  { id: "HTML", label: "HTML" },
  { id: "CSS", label: "CSS" },
  { id: "Javascript", label: "Javascript" },
  { id: "React JS", label: "React JS" },
  { id: "Next JS", label: "Next JS" },
  { id: "Redux", label: "Redux" },
  { id: "Python", label: "Python" },
  { id: "Docker", label: "Docker" },
  { id: "MongoDB", label: "MongoDB" },
  { id: "Kubernetes", label: "Kubernetes" },
  { id: "Data Science", label: "Data Science" },
  { id: "Frontend Development", label: "Frontend Development" },
  { id: "Fullstack Development", label: "Fullstack Development" },
  { id: "MERN Stack Development", label: "MERN Stack Development" },
  { id: "Backend Development", label: "Backend Development" }
];

const Filter = ({ handleFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      const newCategories = prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId];

      handleFilterChange(newCategories, sortByPrice);
      return newCategories;
    });
  };

  const selectByPriceHandler = (selectedValue) => {
    setSortByPrice(selectedValue);
    handleFilterChange(selectedCategories, selectedValue);
  };
  return (
    <div className="w-full md:w-[20%]">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-xl mr-2 text-gray-900 dark:text-gray-100">Filter Options:</h1>
        <Select onValueChange={selectByPriceHandler}>
          <SelectTrigger className="bg-white dark:bg-gray-800 dark:text-gray-100 border dark:border-gray-600">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 dark:text-gray-100">
            <SelectGroup>
              <SelectLabel className="text-gray-700 dark:text-gray-300">Sort by price</SelectLabel>
              <SelectItem value="low" className="hover:bg-gray-200 dark:hover:bg-gray-700">Low to High</SelectItem>
              <SelectItem value="high" className="hover:bg-gray-200 dark:hover:bg-gray-700">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Separator className="my-4 bg-gray-300 dark:bg-gray-600" />
      <div>
        <h1 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">CATEGORIES</h1>
        {categories.map((category) => (
          <div className="flex items-center space-x-2 my-2">
            <Checkbox
              id={category.id}
              onCheckedChange={() => handleCategoryChange(category.id)}
              className="border-gray-400 dark:border-gray-600 dark:bg-gray-800"
            />
            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70
             text-gray-800 dark:text-gray-200">
              {category.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;

