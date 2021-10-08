import * as React from "react";
import { Text, TouchableOpacity } from "react-native";
import tw from "../lib/tailwind";

export const GooButton = ({ text, color = "primary-500", ...props }: any) => (
  <TouchableOpacity
    style={tw`mt-5 w-full flex items-center justify-center px-5 py-3 border border-transparent text-base rounded-md bg-${color} focus:outline-none`}
    {...props}
  >
    <Text style={tw`font-medium text-base text-white`}>{text}</Text>
  </TouchableOpacity>
);
