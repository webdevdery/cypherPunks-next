import Web3 from "web3";
import {
  ContractAddress,
  DefaultNetwork,
  INFURA_ADDRESS,
} from "../../constants/index";
import ABI from "../../contracts/ABI.json";
// import the json containing all metadata. not recommended, try to fetch the database from a middleware if possible, I use MONGODB for example
import traits from "../../database/traits.json";

const infuraAddress = INFURA_ADDRESS;

const CypherPunkApi = async (req, res) => {
  // SOME WEB3 STUFF TO CONNECT TO SMART CONTRACT
  const provider = new Web3.providers.HttpProvider(infuraAddress);
  const web3infura = new Web3(provider);
  const CypherPunkContract = new web3infura.eth.Contract(
    ABI,
    ContractAddress[DefaultNetwork]
  );

  // IF YOU ARE USING INSTA REVEAL MODEL, USE THIS TO GET HOW MANY NFTS ARE MINTED
  const totalSupply = await CypherPunkContract.methods.totalSupply().call();
  //console.log(totalSupply)

  // THE ID YOU ASKED IN THE URL
  const query = req.query.id;
  // IF YOU ARE USING INSTA REVEAL MODEL, UNCOMMENT THIS AND COMMENT THE TWO LINES BELOW
  if (parseInt(query) < totalSupply) {
    const totalCypherPunks = 10000;
    if (parseInt(query) < totalCypherPunks) {
      // CALL CUSTOM TOKEN NAME IN THE CONTRACT
      //const tokenNameCall = await CypherPunkContract.methods.CypherPunkNames(query).call();
      //let tokenName = `#${query}${(tokenNameCall === '') ? "" : ` - ${tokenNameCall}`}`

      // IF YOU ARE NOT USING CUSTOM NAMES, JUST USE THIS
      let tokenName = `#${query}`;

      const signatures = [16, 678, 1685, 2349, 3912, 5454, 6483, 7384, 9431];
      const trait = traits[parseInt(query)];
      // const trait = traits[ Math.floor(Math.random() * 10000) ] // for testing on rinkeby

      // CHECK OPENSEA METADATA STANDARD DOCUMENTATION https://docs.opensea.io/docs/metadata-standards
      let metadata = {};
      // IF THE REQUESTED TOKEN IS A SIGNATURE, RETURN THIS METADATA
      if (signatures.includes(parseInt(query))) {
        metadata = {
          name: tokenName,
          description:
            " CypherPunks is a collection of 10,000 unique NFTs. Note to self: remember to finish this later.",
          tokenId: parseInt(query),
          image: `https://gateway.pinata.cloud/ipfs/${trait["imageIPFS"]}`,
          external_url: "https://www.lazylionsnft.com/",
          attributes: [
            {
              trait_type: "Signature Series",
              value: trait["Signature Series"],
            },
          ],
        };
        // console.log(metadata)
      } else {
        // GENERAL LION METADATA
        metadata = {
          //  " object": CypherPunkContract,
          name: tokenName,
          description:
            " CypherPunks is a collection of 10,000 unique NFTs. Note to self: remember to finish this later.",
          tokenId: parseInt(query),
          image: `https://gateway.pinata.cloud/ipfs/${trait["imageIPFS"]}`,
          external_url: "https://www.lazylionsnft.com/",
          attributes: [
            {
              trait_type: "Background",
              value: trait["Background"],
            },
            {
              trait_type: "Body",
              value: trait["Body"],
            },
            {
              trait_type: "Bodygear",
              value: trait["Bodygear"],
            },
            {
              trait_type: "Earring",
              value: trait["Earring"],
            },
            {
              trait_type: "Eyes",
              value: trait["Eyes"],
            },
            {
              trait_type: "Headgear",
              value: trait["Headgear"],
            },
            {
              trait_type: "Mane",
              value: trait["Mane"],
            },
            {
              trait_type: "Mouth",
              value: trait["Mouth"],
            },
          ],
        };

        // console.log(metadata)
      }

      res.statusCode = 200;
      res.json(metadata);
    } else {
      res.statuscode = 404;
      res.json({ error: "The CypherPunk you requested is out of range" });
    }
  } else {
    res.statuscode = 404;
    res.json({ error: "The CypherPunk you requested hasn't been minted yet" });
  }
  // this is after the reveal
};

export default CypherPunkApi;
