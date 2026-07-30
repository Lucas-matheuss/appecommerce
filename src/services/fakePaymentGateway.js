export const processPayment = async (orderId, amount) => {
    console.log(`Processando pagamento do pedido ${orderId} no valor de R$${amount}...`)

    await new Promise(resolve => setTimeout(resolve, 2000))

    const sucess = true

    if (sucess) {
        return { status: 'sucess', transactionId: `TX-${Date.now()}` }
    } else {
        return { status: 'failed', transactionId: null}
    }
}