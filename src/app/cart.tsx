import { useState } from "react"
import { Text, View, ScrollView, Alert } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useNavigation } from "expo-router"

import { ProducCartProps, useCartStore } from "@/stores/card-store"
import { formatCurrency } from "@/utils/functions/format-currency"

import { Header } from "@/components/header"
import { Product } from "@/components/product"
import { Input } from "@/components/input"
import { Button } from "@/components/button"
import { LinkButton } from "@/components/link-button"

export default function Cart() {
  const navigation = useNavigation()

  const [adress, setAdress] = useState<string>("")
  const cartStore = useCartStore()

  const total = formatCurrency(
    cartStore.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
  )

  function handleProductRemove(product: ProducCartProps) {
    Alert.alert("Remover", `Deseja remover ${product.title} do carrinho ?`, [
      { text: "Cancelar" },
      { text: "Remover ", onPress: () => cartStore.remove(product.id) },
    ])
  }

  function handleOrder() {
    if (adress.trim().length === 0) {
      return Alert.alert("Pedido", "Informe os dados da entrega")
    }

    const products = cartStore.products
      .map((product) => `\n ${product.quantity} ${product.title}`)
      .join("")

    Alert.alert(
      "Pedido Finalizado",
      `Seu pedido foi realizado com sucesso.\n${products}`
    )

    cartStore.clear()
    setAdress("")

    navigation.goBack()
  }

  return (
    <>
      <View className="flex-1 pt-8">
        <Header title="Seu Carrinho" />
        <KeyboardAwareScrollView>
          <ScrollView>
            <View className="p-5 flex-1">
              {cartStore.products.length > 0 ? (
                <View className="border-b border-slate-700">
                  {cartStore.products.map((product) => (
                    <Product
                      key={product.id}
                      data={product}
                      onPress={() => handleProductRemove(product)}
                    />
                  ))}
                </View>
              ) : (
                <Text className="font-body text-slate-400 text-center my-8">
                  Seu carrinho está vazio.
                </Text>
              )}
              <View className="flex-row gap-2 items-center mt-5 mb-4">
                <Text className="text-white text-xl font-subtitle">Total:</Text>
                <Text className="text-lime-400 text-2xl font-heading">
                  {total}
                </Text>
              </View>
              <Input
                placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..."
                onChangeText={setAdress}
                blurOnSubmit={true}
                onSubmitEditing={handleOrder}
                returnKeyType="next"
              />
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>

        <View className="p-5 gap-5">
          <Button onPress={handleOrder}>
            <Button.Text>Finalizar Pedido</Button.Text>
          </Button>

          <LinkButton title="Voltar ao cardápio" href="/" />
        </View>
      </View>
    </>
  )
}
