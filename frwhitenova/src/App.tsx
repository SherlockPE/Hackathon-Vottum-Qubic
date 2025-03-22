import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import { SwapPage } from "./pages/swap-page";
import { TokensPage } from "./pages/tokens-page";
import { NFTsPage } from "./pages/nfts-page";
import { PoolsPage } from "./pages/pools-page";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<SwapPage />} />
          <Route path="/tokens" element={<TokensPage />} />
          <Route path="/nfts" element={<NFTsPage />} />
          <Route path="/pools" element={<PoolsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
