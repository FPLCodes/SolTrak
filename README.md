
# **SolTrak - Solana Wallet Dashboard**

SolTrak is a Solana wallet dashboard that allows users to manage their assets seamlessly. With this application, users can view their Solana token balances, analyze transaction histories, track portfolio performance over time, and visualize their asset distribution with charts. Built using modern web development technologies, SolTrak delivers a clean, responsive, and intuitive interface for both beginners and experienced Solana users.

**Visit the application:**
   Open [sol-trak.vercel.app](https://sol-trak.vercel.app/) in your browser to view the app.
   
## **Features**
- **Connect and Manage Your Wallet**: Easily connect your Solana wallet via the `@solana/wallet-adapter-react-ui`.
- **Real-Time Portfolio Tracking**: View real-time balances of SOL and other tokens in your wallet.
- **Historical Data**: Track the historical performance of your wallet using dynamic line charts.
- **Token Distribution**: Visualize the distribution of tokens in your wallet with a pie chart.
- **Transaction History**: View detailed transaction history with information about each transaction.
- **User-Friendly Interface**: Clean, minimal, and responsive UI for mobile and desktop devices.
- **Cached Data**: Cached conversion rates to reduce API calls and improve user experience.

## **Technologies Used**

### **Languages**
- **TypeScript**: Ensures type safety and better developer experience.
- **JavaScript**: Used in tandem with TypeScript for dynamic functionality.

### **Frameworks & Libraries**
- **Next.js**: The core framework used for this project. Handles server-side rendering (SSR) and static generation.
- **React.js**: The primary JavaScript library for building the user interface.
- **Tailwind CSS**: For styling, providing a utility-first approach to design and layout.
- **ShadCN Components**: Used for consistent and sleek UI elements (cards, tables, buttons, etc.).
- **Solana Web3.js**: Interacts with the Solana blockchain, fetching wallet balances and transaction data.
- **Chart.js**: Creates interactive and responsive charts (pie charts, line charts) to visualize token distribution and wallet performance.
- **Lucide Icons**: Provides lightweight and customizable icons for UI elements.

### **Tools & Libraries for Wallet Connection**
- **@solana/wallet-adapter-react**: Provides multi-wallet support and integration for Solana wallets.
- **@solana/wallet-adapter-react-ui**: Adds pre-built UI components for connecting wallets.

### **APIs Used**
- **Moralis API**: Used for fetching token balances and wallet portfolios.
- **Alchemy API**: Utilized to fetch on-chain data from the Solana blockchain.
- **CoinGecko API**: Retrieves the latest conversion rates between SOL and USD.

### **Responsive Design**
- **Tailwind CSS**: Ensures that the dashboard is fully responsive and works seamlessly across various device sizes (mobile, tablet, and desktop).
