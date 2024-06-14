import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import Cart from "../../cart"

describe("Cart Page", () => {
  test('should call handleOrder when "Finalizar Pedido" button is pressed', () => {
    const { getByText } = render(<Cart />)

    // Encontrar o botão "Finalizar Pedido"
    const buttonElement = getByText("Finalizar Pedido")

    // Simular o clique no botão
    fireEvent.press(buttonElement)
  })
})
