import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import nacl from "tweetnacl";
import { PublicKey } from "@solana/web3.js";

const Hero = () => {
  const { publicKey, signMessage } = useWallet();
  async function signAndSend() {
    console.log(publicKey);
    if (!publicKey) {
      return;
    }
    const message = new TextEncoder().encode(
      "After connection sign this message to prove that this is your account:)"
    );
    const signature = await signMessage?.(message);
    console.log(signature);
    console.log(publicKey);
    if (signature) {
      //const messageBytes = decodeUTF8(message);
      const result = nacl.sign.detached.verify(
        message,
        new Uint8Array(signature),
        new PublicKey(publicKey).toBytes()
      );
      console.log(result);
    }
  }

  useEffect(() => {
    signAndSend();
  }, [publicKey]);
  return <div>Hero</div>;
};

export default Hero;
