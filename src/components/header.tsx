import { Image, View, Text, TouchableOpacity } from "react-native"
import { Feather } from "@expo/vector-icons"
import { Link } from "expo-router"
import colors from "tailwindcss/colors"

type HeaderProps = {
  title: string
  cardQuantityItems?: number
}

export function Header({ title, cardQuantityItems = 0 }: HeaderProps) {
  return (
    <View className="flex-row items-center border-b border-slate-700 pb-5 mx-5">
      <View className="flex-1">
        <Text className="text-white text-xl font-heading mt-2">{title}</Text>
      </View>

      {cardQuantityItems > 0 && (
        <Link href={"/cart"} asChild>
          <TouchableOpacity className="relative" activeOpacity={0.7}>
            <View className="bg-lime-300 w-4 h-4 rounded-full items-center justify-center top-2 z-10 -right-3.5">
              <Text className="text-slaate-900 font-bold text-xs">
                {cardQuantityItems}
              </Text>
            </View>

            <Feather name="shopping-cart" color={colors.white} size={24} />
          </TouchableOpacity>
        </Link>
      )}
    </View>
  )
}
