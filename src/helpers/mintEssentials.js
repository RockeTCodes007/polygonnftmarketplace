import axios from "axios";
import { toastInfo, toastError } from "./Toast";

async function pinFileToIPFS(file) {
  if (!file) {
    toastError("Upload an image to mint");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  const metadata = JSON.stringify({
    name: file.name,
  });

  formData.append("pinataMetadata", metadata);
  const options = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", options);

  let ipfsHash = "";

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0OTc2ZTQ3Yi0zYmQ5LTQ1OWItOGExOS00MTdiMTEyYjI5OWYiLCJlbWFpbCI6ImthdXNoYWxiaGFyZHdhajExMjVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjdhYWZkNzY3Y2EzYmM3NTkwNDZiIiwic2NvcGVkS2V5U2VjcmV0IjoiOTFjZWJlYmU4NDFhYTEyNzhlMTA4NjQ4NzRlYTRkYWIyYWNiMDFmMmE4NmE0MzgwNzMyYjU0YmM2Y2I0OTQ2NCIsImlhdCI6MTY4MzM1ODkzMn0.wjPdIIBlsxVjTIWthshHgMOAvn1WhTJloABj_bvAQxY",
        },
      }
    );
    ipfsHash = res.data.IpfsHash;
    if (ipfsHash.length !== 0) {
      toastInfo("NFT Uploaded to IPFS Successfully");
    }
    return ipfsHash;
  } catch (error) {
    toastError("IPFS upload failed!");
    console.log(error);
    return null;
  }
}

export { pinFileToIPFS };
