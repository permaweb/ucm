import { SourceType, WarpFactory } from 'warp-contracts'
import { DeployPlugin, ArweaveSigner } from 'warp-contracts-plugin-deploy'
import fs from 'fs'

const jwk = JSON.parse(fs.readFileSync(process.argv[2], 'utf-8'))
const src = fs.readFileSync('./dist/index.js', 'utf-8')
const warp = WarpFactory.forMainnet().use(new DeployPlugin())
const initState = JSON.parse(fs.readFileSync('./scripts/state.json', 'utf-8'))

async function main() {
  const result = await warp.deploy({
    wallet: new ArweaveSigner(jwk),
    src,
    initState: JSON.stringify(initState),
    //initState,
    evaluationManifest: {
      evaluationOptions: {
        sourceType: SourceType.WARP_SEQUENCER,
        allowBigInt: true,
        internalWrites: true,
        unsafeClient: 'skip'
      }
    }
  })
  console.log(result)
}

main()
