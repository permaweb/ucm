import { DeployPlugin, ArweaveSigner } from 'warp-contracts-plugin-deploy'
import { WarpFactory } from 'warp-contracts'
import fs from 'fs'

const warp = WarpFactory.forMainnet().use(new DeployPlugin())
const jwk = JSON.parse(fs.readFileSync('./wallet.json', 'utf-8'))
const signer = new ArweaveSigner(jwk)
//const ucm = 'XW_z0WhM5PsVD-nmyNm1pCK1za9uysu1vco1HS8DpIo'
//const ucm = 'V6fwgkTtbRJVu_yKGJM2RQ6bHte35_g0Sj2C_BIdScs'
const ucm = 'IOtejAGHWiiwz4HuVDagKUldWDlhsaTnmXQStSqcsrw'

async function main() {
  const src = fs.readFileSync('./dist/index.js', 'utf-8')
  const tx = await warp.createSource({ src }, signer)
  const newSrcId = await warp.saveSource(tx)
  console.log(newSrcId)
  const result = await warp.contract(ucm).connect(signer).evolve(newSrcId)
  console.log(result)
}

main()
