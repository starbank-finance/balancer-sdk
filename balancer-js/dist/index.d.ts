import { BigNumberish, BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { SOR } from 'sor-linear';
import { Signer, TypedDataSigner } from '@ethersproject/abstract-signer';

declare enum StablePoolJoinKind {
    INIT = 0,
    EXACT_TOKENS_IN_FOR_BPT_OUT = 1,
    TOKEN_IN_FOR_EXACT_BPT_OUT = 2
}
declare enum StablePhantomPoolJoinKind {
    INIT = 0,
    COLLECT_PROTOCOL_FEES = 1
}
declare enum StablePoolExitKind {
    EXACT_BPT_IN_FOR_ONE_TOKEN_OUT = 0,
    EXACT_BPT_IN_FOR_TOKENS_OUT = 1,
    BPT_IN_FOR_EXACT_TOKENS_OUT = 2
}
declare class StablePoolEncoder {
    /**
     * Cannot be constructed.
     */
    private constructor();
    /**
     * Encodes the userData parameter for providing the initial liquidity to a StablePool
     * @param initialBalances - the amounts of tokens to send to the pool to form the initial balances
     */
    static joinInit: (amountsIn: BigNumberish[]) => string;
    /**
     * Encodes the userData parameter for collecting protocol fees for StablePhantomPool
     */
    static joinCollectProtocolFees: () => string;
    /**
     * Encodes the userData parameter for joining a StablePool with exact token inputs
     * @param amountsIn - the amounts each of token to deposit in the pool as liquidity
     * @param minimumBPT - the minimum acceptable BPT to receive in return for deposited tokens
     */
    static joinExactTokensInForBPTOut: (amountsIn: BigNumberish[], minimumBPT: BigNumberish) => string;
    /**
     * Encodes the userData parameter for joining a StablePool with to receive an exact amount of BPT
     * @param bptAmountOut - the amount of BPT to be minted
     * @param enterTokenIndex - the index of the token to be provided as liquidity
     */
    static joinTokenInForExactBPTOut: (bptAmountOut: BigNumberish, enterTokenIndex: number) => string;
    /**
     * Encodes the userData parameter for exiting a StablePool by removing a single token in return for an exact amount of BPT
     * @param bptAmountIn - the amount of BPT to be burned
     * @param enterTokenIndex - the index of the token to removed from the pool
     */
    static exitExactBPTInForOneTokenOut: (bptAmountIn: BigNumberish, exitTokenIndex: number) => string;
    /**
     * Encodes the userData parameter for exiting a StablePool by removing tokens in return for an exact amount of BPT
     * @param bptAmountIn - the amount of BPT to be burned
     */
    static exitExactBPTInForTokensOut: (bptAmountIn: BigNumberish) => string;
    /**
     * Encodes the userData parameter for exiting a StablePool by removing exact amounts of tokens
     * @param amountsOut - the amounts of each token to be withdrawn from the pool
     * @param maxBPTAmountIn - the minimum acceptable BPT to burn in return for withdrawn tokens
     */
    static exitBPTInForExactTokensOut: (amountsOut: BigNumberish[], maxBPTAmountIn: BigNumberish) => string;
}

declare enum WeightedPoolJoinKind {
    INIT = 0,
    EXACT_TOKENS_IN_FOR_BPT_OUT = 1,
    TOKEN_IN_FOR_EXACT_BPT_OUT = 2,
    ALL_TOKENS_IN_FOR_EXACT_BPT_OUT = 3
}
declare enum WeightedPoolExitKind {
    EXACT_BPT_IN_FOR_ONE_TOKEN_OUT = 0,
    EXACT_BPT_IN_FOR_TOKENS_OUT = 1,
    BPT_IN_FOR_EXACT_TOKENS_OUT = 2,
    MANAGEMENT_FEE_TOKENS_OUT = 3
}
declare class WeightedPoolEncoder {
    /**
     * Cannot be constructed.
     */
    private constructor();
    /**
     * Encodes the userData parameter for providing the initial liquidity to a WeightedPool
     * @param initialBalances - the amounts of tokens to send to the pool to form the initial balances
     */
    static joinInit: (amountsIn: BigNumberish[]) => string;
    /**
     * Encodes the userData parameter for joining a WeightedPool with exact token inputs
     * @param amountsIn - the amounts each of token to deposit in the pool as liquidity
     * @param minimumBPT - the minimum acceptable BPT to receive in return for deposited tokens
     */
    static joinExactTokensInForBPTOut: (amountsIn: BigNumberish[], minimumBPT: BigNumberish) => string;
    /**
     * Encodes the userData parameter for joining a WeightedPool with a single token to receive an exact amount of BPT
     * @param bptAmountOut - the amount of BPT to be minted
     * @param enterTokenIndex - the index of the token to be provided as liquidity
     */
    static joinTokenInForExactBPTOut: (bptAmountOut: BigNumberish, enterTokenIndex: number) => string;
    /**
     * Encodes the userData parameter for joining a WeightedPool proportionally to receive an exact amount of BPT
     * @param bptAmountOut - the amount of BPT to be minted
     */
    static joinAllTokensInForExactBPTOut: (bptAmountOut: BigNumberish) => string;
    /**
     * Encodes the userData parameter for exiting a WeightedPool by removing a single token in return for an exact amount of BPT
     * @param bptAmountIn - the amount of BPT to be burned
     * @param enterTokenIndex - the index of the token to removed from the pool
     */
    static exitExactBPTInForOneTokenOut: (bptAmountIn: BigNumberish, exitTokenIndex: number) => string;
    /**
     * Encodes the userData parameter for exiting a WeightedPool by removing tokens in return for an exact amount of BPT
     * @param bptAmountIn - the amount of BPT to be burned
     */
    static exitExactBPTInForTokensOut: (bptAmountIn: BigNumberish) => string;
    /**
     * Encodes the userData parameter for exiting a WeightedPool by removing exact amounts of tokens
     * @param amountsOut - the amounts of each token to be withdrawn from the pool
     * @param maxBPTAmountIn - the minimum acceptable BPT to burn in return for withdrawn tokens
     */
    static exitBPTInForExactTokensOut: (amountsOut: BigNumberish[], maxBPTAmountIn: BigNumberish) => string;
}
declare class ManagedPoolEncoder {
    /**
     * Cannot be constructed.
     */
    private constructor();
    /**
     * Encodes the userData parameter for exiting a ManagedPool for withdrawing management fees.
     * This can only be done by the pool owner.
     */
    static exitForManagementFees: () => string;
}

/**
 * Normalize an array of token weights to ensure they sum to `1e18`
 * @param weights - an array of token weights to be normalized
 * @returns an equivalent set of normalized weights
 */
declare function toNormalizedWeights(weights: BigNumber[]): BigNumber[];
/**
 * Check whether a set of weights are normalized
 * @param weights - an array of potentially unnormalized weights
 * @returns a boolean of whether the weights are normalized
 */
declare const isNormalizedWeights: (weights: BigNumberish[]) => boolean;

declare enum Network {
    MAINNET = 1,
    ROPSTEN = 3,
    RINKEBY = 4,
    GÖRLI = 5,
    KOVAN = 42,
    POLYGON = 137,
    ARBITRUM = 42161
}

declare enum PoolSpecialization {
    GeneralPool = 0,
    MinimalSwapInfoPool = 1,
    TwoTokenPool = 2
}
declare type JoinPoolRequest = {
    assets: string[];
    maxAmountsIn: BigNumberish[];
    userData: string;
    fromInternalBalance: boolean;
};
declare type ExitPoolRequest = {
    assets: string[];
    minAmountsOut: BigNumberish[];
    userData: string;
    toInternalBalance: boolean;
};
declare enum UserBalanceOpKind {
    DepositInternal = 0,
    WithdrawInternal = 1,
    TransferInternal = 2,
    TransferExternal = 3
}
declare type UserBalanceOp = {
    kind: UserBalanceOpKind;
    asset: string;
    amount: BigNumberish;
    sender: string;
    recipient: string;
};
declare enum PoolBalanceOpKind {
    Withdraw = 0,
    Deposit = 1,
    Update = 2
}
declare type PoolBalanceOp = {
    kind: PoolBalanceOpKind;
    poolId: string;
    token: string;
    amount: BigNumberish;
};
declare type ConfigSdk = {
    network: Network;
    rpcUrl: string;
    subgraphUrl: string;
};
interface TransactionData {
    contract?: Contract;
    function: string;
    params: string[];
    outputs?: any;
}

/**
 * Splits a poolId into its components, i.e. pool address, pool specialization and its nonce
 * @param poolId - a bytes32 string of the pool's ID
 * @returns an object with the decomposed poolId
 */
declare const splitPoolId: (poolId: string) => {
    address: string;
    specialization: PoolSpecialization;
    nonce: BigNumber;
};
/**
 * Extracts a pool's address from its poolId
 * @param poolId - a bytes32 string of the pool's ID
 * @returns the pool's address
 */
declare const getPoolAddress: (poolId: string) => string;
/**
 * Extracts a pool's specialization from its poolId
 * @param poolId - a bytes32 string of the pool's ID
 * @returns the pool's specialization
 */
declare const getPoolSpecialization: (poolId: string) => PoolSpecialization;
/**
 * Extracts a pool's nonce from its poolId
 * @param poolId - a bytes32 string of the pool's ID
 * @returns the pool's nonce
 */
declare const getPoolNonce: (poolId: string) => BigNumber;

declare class BalancerErrors {
    /**
     * Cannot be constructed.
     */
    private constructor();
    static isErrorCode: (error: string) => boolean;
    /**
     * Decodes a Balancer error code into the corresponding reason
     * @param error - a Balancer error code of the form `BAL#000`
     * @returns The decoded error reason
     */
    static parseErrorCode: (error: string) => string;
    /**
     * Decodes a Balancer error code into the corresponding reason
     * @param error - a Balancer error code of the form `BAL#000`
     * @returns The decoded error reason if passed a valid error code, otherwise returns passed input
     */
    static tryParseErrorCode: (error: string) => string;
    /**
     * Tests whether a string is a known Balancer error message
     * @param error - a string to be checked verified as a Balancer error message
     */
    static isBalancerError: (error: string) => boolean;
    /**
     * Encodes an error string into the corresponding error code
     * @param error - a Balancer error message string
     * @returns a Balancer error code of the form `BAL#000`
     */
    static encodeError: (error: string) => string;
}

declare type Account = string | Signer | Contract;
declare function accountToAddress(account: Account): Promise<string>;
declare enum RelayerAction {
    JoinPool = "JoinPool",
    ExitPool = "ExitPool",
    Swap = "Swap",
    BatchSwap = "BatchSwap",
    SetRelayerApproval = "SetRelayerApproval"
}
declare class RelayerAuthorization {
    /**
     * Cannot be constructed.
     */
    private constructor();
    static encodeCalldataAuthorization: (calldata: string, deadline: BigNumberish, signature: string) => string;
    static signJoinAuthorization: (validator: Contract, user: Signer & TypedDataSigner, allowedSender: Account, allowedCalldata: string, deadline?: BigNumberish | undefined, nonce?: BigNumberish | undefined) => Promise<string>;
    static signExitAuthorization: (validator: Contract, user: Signer & TypedDataSigner, allowedSender: Account, allowedCalldata: string, deadline?: BigNumberish | undefined, nonce?: BigNumberish | undefined) => Promise<string>;
    static signSwapAuthorization: (validator: Contract, user: Signer & TypedDataSigner, allowedSender: Account, allowedCalldata: string, deadline?: BigNumberish | undefined, nonce?: BigNumberish | undefined) => Promise<string>;
    static signBatchSwapAuthorization: (validator: Contract, user: Signer & TypedDataSigner, allowedSender: Account, allowedCalldata: string, deadline?: BigNumberish | undefined, nonce?: BigNumberish | undefined) => Promise<string>;
    static signSetRelayerApprovalAuthorization: (validator: Contract, user: Signer & TypedDataSigner, allowedSender: Account, allowedCalldata: string, deadline?: BigNumberish | undefined, nonce?: BigNumberish | undefined) => Promise<string>;
    static signAuthorizationFor: (type: RelayerAction, validator: Contract, user: Signer & TypedDataSigner, allowedSender: Account, allowedCalldata: string, deadline?: BigNumberish, nonce?: BigNumberish | undefined) => Promise<string>;
}

declare const signPermit: (token: Contract, owner: Signer & TypedDataSigner, spender: Account, amount: BigNumberish, deadline?: BigNumberish, nonce?: BigNumberish | undefined) => Promise<{
    v: number;
    r: string;
    s: string;
    deadline: BigNumber;
    nonce: BigNumber;
}>;

declare class AssetHelpers {
    readonly ETH: string;
    readonly WETH: string;
    constructor(wethAddress: string);
    static isEqual: (addressA: string, addressB: string) => boolean;
    /**
     * Tests whether `token` is ETH (represented by `0x0000...0000`).
     *
     * @param token - the address of the asset to be checked
     */
    isETH: (token: string) => boolean;
    /**
     * Tests whether `token` is WETH.
     *
     * @param token - the address of the asset to be checked
     */
    isWETH: (token: string) => boolean;
    /**
     * Converts an asset to the equivalent ERC20 address.
     *
     * For ERC20s this will return the passed address but passing ETH (`0x0000...0000`) will return the WETH address
     * @param token - the address of the asset to be translated to an equivalent ERC20
     * @returns the address of translated ERC20 asset
     */
    translateToERC20: (token: string) => string;
    /**
     * Sorts an array of token addresses into ascending order to match the format expected by the Vault.
     *
     * Passing additional arrays will result in each being sorted to maintain relative ordering to token addresses.
     *
     * The zero address (representing ETH) is sorted as if it were the WETH address.
     * This matches the behaviour expected by the Vault when receiving an array of addresses.
     *
     * @param tokens - an array of token addresses to be sorted in ascending order
     * @param others - a set of arrays to be sorted in the same order as the tokens, e.g. token weights or asset manager addresses
     * @returns an array of the form `[tokens, ...others]` where each subarray has been sorted to maintain its ordering relative to `tokens`
     *
     * @example
     * const [tokens] = sortTokens([tokenB, tokenC, tokenA])
     * const [tokens, weights] = sortTokens([tokenB, tokenC, tokenA], [weightB, weightC, weightA])
     * // where tokens = [tokenA, tokenB, tokenC], weights = [weightA, weightB, weightC]
     */
    sortTokens(tokens: string[], ...others: unknown[][]): [string[], ...unknown[][]];
}

declare const isSameAddress: (address1: string, address2: string) => boolean;

declare enum SwapType {
    SwapExactIn = 0,
    SwapExactOut = 1
}
declare type FundManagement = {
    sender: string;
    recipient: string;
    fromInternalBalance: boolean;
    toInternalBalance: boolean;
};
declare type SingleSwap = {
    poolId: string;
    kind: SwapType;
    assetIn: string;
    assetOut: string;
    amount: BigNumberish;
    userData: string;
};
declare type Swap = {
    kind: SwapType;
    singleSwap: SingleSwap;
    limit: BigNumberish;
    deadline: BigNumberish;
};
declare type BatchSwapStep = {
    poolId: string;
    assetInIndex: number;
    assetOutIndex: number;
    amount: BigNumberish;
    userData: string;
};
declare type BatchSwap = {
    kind: SwapType;
    swaps: BatchSwapStep[];
    assets: string[];
    funds: FundManagement;
    limits: BigNumberish[];
    deadline: BigNumberish;
};

declare class SwapsService {
    network: Network;
    rpcUrl: string;
    sor: SOR;
    constructor(config: ConfigSdk);
    static getLimitsForSlippage(tokensIn: string[], tokensOut: string[], swapType: SwapType, amountsTokenIn: BigNumberish[], amountsTokenOut: BigNumberish[], assets: string[], slippage: BigNumberish): BigNumberish[];
    /**
     * queryBatchSwap simulates a call to `batchSwap`, returning an array of Vault asset deltas.
     * @param swapType - either exactIn or exactOut.
     * @param swaps - sequence of swaps.
     * @param assets - array contains the addresses of all assets involved in the swaps.
     * @returns Returns an array with the net Vault asset balance deltas. Positive amounts represent tokens (or ETH) sent to the
     * Vault, and negative amounts represent tokens (or ETH) sent by the Vault. Each delta corresponds to the asset at
     * the same index in the `assets` array.
     */
    queryBatchSwap(swapType: SwapType, swaps: BatchSwapStep[], assets: string[]): Promise<BigNumberish[]>;
    /**
     * Uses SOR to create and query a batchSwap for multiple tokens in > single tokenOut.
     * @param tokensIn - array of addresses of assets in.
     * @param amountsIn - array of amounts for tokens in.
     * @param tokenOut - asset out.
     * @param fetchPools - if true SOR will fetch updated pool info from Subgraph.
     * @returns Returns amount of tokenOut along with swap and asset info that can be submitted to a batchSwap call.
     */
    queryBatchSwapTokensIn(tokensIn: string[], amountsIn: BigNumberish[], tokenOut: string, fetchPools?: boolean): Promise<{
        amountTokenOut: BigNumberish;
        swaps: BatchSwapStep[];
        assets: string[];
    }>;
    /**
     * Uses SOR to create and query a batchSwap for multiple tokens in > single tokenOut.
     * @param tokenIn - addresses of asset in.
     * @param amountsIn - amount of tokenIn for corresponding tokenOut.
     * @param tokensOut - array of addresses of assets out.
     * @param fetchPools - if true SOR will fetch updated pool info from Subgraph.
     * @returns Returns array of amounts for each tokenOut along with swap and asset info that can be submitted to a batchSwap call.
     */
    queryBatchSwapTokensOut(tokenIn: string, amountsIn: BigNumberish[], tokensOut: string[], fetchPools?: boolean): Promise<{
        amountTokensOut: string[];
        swaps: BatchSwapStep[];
        assets: string[];
    }>;
}

declare function getLimitsForSlippage(tokensIn: string[], tokensOut: string[], swapType: SwapType, amountsTokenIn: BigNumberish[], amountsTokenOut: BigNumberish[], assets: string[], slippage: BigNumberish): BigNumberish[];

declare const SUBGRAPH_URLS: {
    1: string;
    5: string;
    42: string;
    137: string;
    42161: string;
};

declare type OutputReference = {
    index: number;
    key: BigNumber;
};
interface EncodeBatchSwapInput {
    swapType: SwapType;
    swaps: BatchSwapStep[];
    assets: string[];
    funds: FundManagement;
    limits: string[];
    deadline: BigNumberish;
    value: BigNumberish;
    outputReferences: OutputReference[];
}
interface EncodeUnwrapAaveStaticTokenInput {
    staticToken: string;
    sender: string;
    recipient: string;
    amount: BigNumberish;
    toUnderlying: boolean;
    outputReferences: BigNumberish;
}

declare class RelayerService {
    swapsService: SwapsService;
    rpcUrl: string;
    static CHAINED_REFERENCE_PREFIX: string;
    constructor(swapsService: SwapsService, rpcUrl: string);
    static encodeBatchSwap(params: EncodeBatchSwapInput): string;
    static encodeUnwrapAaveStaticToken(params: EncodeUnwrapAaveStaticTokenInput): string;
    static toChainedReference(key: BigNumberish): BigNumber;
    /**
     * swapUnwrapExactIn returns call data for Relayer Multicall where batchSwaps followed by unwrap of Aave static tokens.
     * @param tokensIn - array to token addresses for swapping as tokens in.
     * @param amountsIn - amounts to be swapped for each token in.
     * @param wrappedTokens - array contains the addresses of the Aave static tokens that tokenIn will be swapped to. These will be unwrapped.
     * @param rates - The rate used to convert wrappedToken to underlying.
     * @param funds - Funding info for swap. Note - recipient should be relayer and sender should be caller.
     * @param slippage - Slippage to be applied to swap section. i.e. 5%=50000000000000000.
     * @returns Transaction data with calldata. Outputs.amountsOut has final amounts out of unwrapped tokens.
     */
    swapUnwrapExactIn(tokensIn: string[], amountsIn: BigNumberish[], wrappedTokens: string[], rates: BigNumberish[], funds: FundManagement, slippage: BigNumberish): Promise<TransactionData>;
}

declare class BalancerSDK {
    network: Network;
    rpcUrl: string;
    swaps: SwapsService;
    relayer: RelayerService;
    constructor(config: ConfigSdk, swapService?: typeof SwapsService, relayerService?: typeof RelayerService);
}

export { Account, AssetHelpers, BalancerErrors, BalancerSDK, BatchSwap, BatchSwapStep, ConfigSdk, ExitPoolRequest, FundManagement, JoinPoolRequest, ManagedPoolEncoder, Network, PoolBalanceOp, PoolBalanceOpKind, PoolSpecialization, RelayerAction, RelayerAuthorization, SUBGRAPH_URLS, SingleSwap, StablePhantomPoolJoinKind, StablePoolEncoder, StablePoolExitKind, StablePoolJoinKind, Swap, SwapType, SwapsService, TransactionData, UserBalanceOp, UserBalanceOpKind, WeightedPoolEncoder, WeightedPoolExitKind, WeightedPoolJoinKind, accountToAddress, getLimitsForSlippage, getPoolAddress, getPoolNonce, getPoolSpecialization, isNormalizedWeights, isSameAddress, signPermit, splitPoolId, toNormalizedWeights };