
/**
 * Client
**/

import * as runtime from '@prisma/client/runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UserSignature
 * 
 */
export type UserSignature = $Result.DefaultSelection<Prisma.$UserSignaturePayload>
/**
 * Model SignatureAudit
 * 
 */
export type SignatureAudit = $Result.DefaultSelection<Prisma.$SignatureAuditPayload>
/**
 * Model RefreshToken
 * 
 */
export type RefreshToken = $Result.DefaultSelection<Prisma.$RefreshTokenPayload>
/**
 * Model Invoice
 * 
 */
export type Invoice = $Result.DefaultSelection<Prisma.$InvoicePayload>
/**
 * Model Partner
 * 
 */
export type Partner = $Result.DefaultSelection<Prisma.$PartnerPayload>
/**
 * Model InvoiceLine
 * 
 */
export type InvoiceLine = $Result.DefaultSelection<Prisma.$InvoiceLinePayload>
/**
 * Model AllowanceCharge
 * 
 */
export type AllowanceCharge = $Result.DefaultSelection<Prisma.$AllowanceChargePayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.userSignature`: Exposes CRUD operations for the **UserSignature** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserSignatures
    * const userSignatures = await prisma.userSignature.findMany()
    * ```
    */
  get userSignature(): Prisma.UserSignatureDelegate<ExtArgs>;

  /**
   * `prisma.signatureAudit`: Exposes CRUD operations for the **SignatureAudit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SignatureAudits
    * const signatureAudits = await prisma.signatureAudit.findMany()
    * ```
    */
  get signatureAudit(): Prisma.SignatureAuditDelegate<ExtArgs>;

  /**
   * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RefreshTokens
    * const refreshTokens = await prisma.refreshToken.findMany()
    * ```
    */
  get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs>;

  /**
   * `prisma.invoice`: Exposes CRUD operations for the **Invoice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Invoices
    * const invoices = await prisma.invoice.findMany()
    * ```
    */
  get invoice(): Prisma.InvoiceDelegate<ExtArgs>;

  /**
   * `prisma.partner`: Exposes CRUD operations for the **Partner** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Partners
    * const partners = await prisma.partner.findMany()
    * ```
    */
  get partner(): Prisma.PartnerDelegate<ExtArgs>;

  /**
   * `prisma.invoiceLine`: Exposes CRUD operations for the **InvoiceLine** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InvoiceLines
    * const invoiceLines = await prisma.invoiceLine.findMany()
    * ```
    */
  get invoiceLine(): Prisma.InvoiceLineDelegate<ExtArgs>;

  /**
   * `prisma.allowanceCharge`: Exposes CRUD operations for the **AllowanceCharge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AllowanceCharges
    * const allowanceCharges = await prisma.allowanceCharge.findMany()
    * ```
    */
  get allowanceCharge(): Prisma.AllowanceChargeDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    UserSignature: 'UserSignature',
    SignatureAudit: 'SignatureAudit',
    RefreshToken: 'RefreshToken',
    Invoice: 'Invoice',
    Partner: 'Partner',
    InvoiceLine: 'InvoiceLine',
    AllowanceCharge: 'AllowanceCharge'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "userSignature" | "signatureAudit" | "refreshToken" | "invoice" | "partner" | "invoiceLine" | "allowanceCharge"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      UserSignature: {
        payload: Prisma.$UserSignaturePayload<ExtArgs>
        fields: Prisma.UserSignatureFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserSignatureFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSignaturePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserSignatureFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSignaturePayload>
          }
          findFirst: {
            args: Prisma.UserSignatureFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSignaturePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserSignatureFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSignaturePayload>
          }
          findMany: {
            args: Prisma.UserSignatureFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSignaturePayload>[]
          }
          create: {
            args: Prisma.UserSignatureCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSignaturePayload>
          }
          createMany: {
            args: Prisma.UserSignatureCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserSignatureCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSignaturePayload>[]
          }
          delete: {
            args: Prisma.UserSignatureDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSignaturePayload>
          }
          update: {
            args: Prisma.UserSignatureUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSignaturePayload>
          }
          deleteMany: {
            args: Prisma.UserSignatureDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserSignatureUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserSignatureUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSignaturePayload>
          }
          aggregate: {
            args: Prisma.UserSignatureAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserSignature>
          }
          groupBy: {
            args: Prisma.UserSignatureGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserSignatureGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserSignatureCountArgs<ExtArgs>
            result: $Utils.Optional<UserSignatureCountAggregateOutputType> | number
          }
        }
      }
      SignatureAudit: {
        payload: Prisma.$SignatureAuditPayload<ExtArgs>
        fields: Prisma.SignatureAuditFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SignatureAuditFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignatureAuditPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SignatureAuditFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignatureAuditPayload>
          }
          findFirst: {
            args: Prisma.SignatureAuditFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignatureAuditPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SignatureAuditFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignatureAuditPayload>
          }
          findMany: {
            args: Prisma.SignatureAuditFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignatureAuditPayload>[]
          }
          create: {
            args: Prisma.SignatureAuditCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignatureAuditPayload>
          }
          createMany: {
            args: Prisma.SignatureAuditCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SignatureAuditCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignatureAuditPayload>[]
          }
          delete: {
            args: Prisma.SignatureAuditDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignatureAuditPayload>
          }
          update: {
            args: Prisma.SignatureAuditUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignatureAuditPayload>
          }
          deleteMany: {
            args: Prisma.SignatureAuditDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SignatureAuditUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SignatureAuditUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignatureAuditPayload>
          }
          aggregate: {
            args: Prisma.SignatureAuditAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSignatureAudit>
          }
          groupBy: {
            args: Prisma.SignatureAuditGroupByArgs<ExtArgs>
            result: $Utils.Optional<SignatureAuditGroupByOutputType>[]
          }
          count: {
            args: Prisma.SignatureAuditCountArgs<ExtArgs>
            result: $Utils.Optional<SignatureAuditCountAggregateOutputType> | number
          }
        }
      }
      RefreshToken: {
        payload: Prisma.$RefreshTokenPayload<ExtArgs>
        fields: Prisma.RefreshTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findFirst: {
            args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findMany: {
            args: Prisma.RefreshTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          create: {
            args: Prisma.RefreshTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          createMany: {
            args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          delete: {
            args: Prisma.RefreshTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          update: {
            args: Prisma.RefreshTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          deleteMany: {
            args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RefreshTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          aggregate: {
            args: Prisma.RefreshTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefreshToken>
          }
          groupBy: {
            args: Prisma.RefreshTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefreshTokenCountArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenCountAggregateOutputType> | number
          }
        }
      }
      Invoice: {
        payload: Prisma.$InvoicePayload<ExtArgs>
        fields: Prisma.InvoiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvoiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvoiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          findFirst: {
            args: Prisma.InvoiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvoiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          findMany: {
            args: Prisma.InvoiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>[]
          }
          create: {
            args: Prisma.InvoiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          createMany: {
            args: Prisma.InvoiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InvoiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>[]
          }
          delete: {
            args: Prisma.InvoiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          update: {
            args: Prisma.InvoiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          deleteMany: {
            args: Prisma.InvoiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvoiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InvoiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          aggregate: {
            args: Prisma.InvoiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvoice>
          }
          groupBy: {
            args: Prisma.InvoiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvoiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvoiceCountArgs<ExtArgs>
            result: $Utils.Optional<InvoiceCountAggregateOutputType> | number
          }
        }
      }
      Partner: {
        payload: Prisma.$PartnerPayload<ExtArgs>
        fields: Prisma.PartnerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PartnerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PartnerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          findFirst: {
            args: Prisma.PartnerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PartnerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          findMany: {
            args: Prisma.PartnerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>[]
          }
          create: {
            args: Prisma.PartnerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          createMany: {
            args: Prisma.PartnerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PartnerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>[]
          }
          delete: {
            args: Prisma.PartnerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          update: {
            args: Prisma.PartnerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          deleteMany: {
            args: Prisma.PartnerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PartnerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PartnerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          aggregate: {
            args: Prisma.PartnerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePartner>
          }
          groupBy: {
            args: Prisma.PartnerGroupByArgs<ExtArgs>
            result: $Utils.Optional<PartnerGroupByOutputType>[]
          }
          count: {
            args: Prisma.PartnerCountArgs<ExtArgs>
            result: $Utils.Optional<PartnerCountAggregateOutputType> | number
          }
        }
      }
      InvoiceLine: {
        payload: Prisma.$InvoiceLinePayload<ExtArgs>
        fields: Prisma.InvoiceLineFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvoiceLineFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceLinePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvoiceLineFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceLinePayload>
          }
          findFirst: {
            args: Prisma.InvoiceLineFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceLinePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvoiceLineFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceLinePayload>
          }
          findMany: {
            args: Prisma.InvoiceLineFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceLinePayload>[]
          }
          create: {
            args: Prisma.InvoiceLineCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceLinePayload>
          }
          createMany: {
            args: Prisma.InvoiceLineCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InvoiceLineCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceLinePayload>[]
          }
          delete: {
            args: Prisma.InvoiceLineDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceLinePayload>
          }
          update: {
            args: Prisma.InvoiceLineUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceLinePayload>
          }
          deleteMany: {
            args: Prisma.InvoiceLineDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvoiceLineUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InvoiceLineUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceLinePayload>
          }
          aggregate: {
            args: Prisma.InvoiceLineAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvoiceLine>
          }
          groupBy: {
            args: Prisma.InvoiceLineGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvoiceLineGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvoiceLineCountArgs<ExtArgs>
            result: $Utils.Optional<InvoiceLineCountAggregateOutputType> | number
          }
        }
      }
      AllowanceCharge: {
        payload: Prisma.$AllowanceChargePayload<ExtArgs>
        fields: Prisma.AllowanceChargeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AllowanceChargeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllowanceChargePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AllowanceChargeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllowanceChargePayload>
          }
          findFirst: {
            args: Prisma.AllowanceChargeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllowanceChargePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AllowanceChargeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllowanceChargePayload>
          }
          findMany: {
            args: Prisma.AllowanceChargeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllowanceChargePayload>[]
          }
          create: {
            args: Prisma.AllowanceChargeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllowanceChargePayload>
          }
          createMany: {
            args: Prisma.AllowanceChargeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AllowanceChargeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllowanceChargePayload>[]
          }
          delete: {
            args: Prisma.AllowanceChargeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllowanceChargePayload>
          }
          update: {
            args: Prisma.AllowanceChargeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllowanceChargePayload>
          }
          deleteMany: {
            args: Prisma.AllowanceChargeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AllowanceChargeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AllowanceChargeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllowanceChargePayload>
          }
          aggregate: {
            args: Prisma.AllowanceChargeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAllowanceCharge>
          }
          groupBy: {
            args: Prisma.AllowanceChargeGroupByArgs<ExtArgs>
            result: $Utils.Optional<AllowanceChargeGroupByOutputType>[]
          }
          count: {
            args: Prisma.AllowanceChargeCountArgs<ExtArgs>
            result: $Utils.Optional<AllowanceChargeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    invoices: number
    refreshTokens: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invoices?: boolean | UserCountOutputTypeCountInvoicesArgs
    refreshTokens?: boolean | UserCountOutputTypeCountRefreshTokensArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInvoicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRefreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
  }


  /**
   * Count Type InvoiceCountOutputType
   */

  export type InvoiceCountOutputType = {
    lines: number
    allowances: number
  }

  export type InvoiceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lines?: boolean | InvoiceCountOutputTypeCountLinesArgs
    allowances?: boolean | InvoiceCountOutputTypeCountAllowancesArgs
  }

  // Custom InputTypes
  /**
   * InvoiceCountOutputType without action
   */
  export type InvoiceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceCountOutputType
     */
    select?: InvoiceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InvoiceCountOutputType without action
   */
  export type InvoiceCountOutputTypeCountLinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceLineWhereInput
  }

  /**
   * InvoiceCountOutputType without action
   */
  export type InvoiceCountOutputTypeCountAllowancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AllowanceChargeWhereInput
  }


  /**
   * Count Type PartnerCountOutputType
   */

  export type PartnerCountOutputType = {
    supplierInvoices: number
    buyerInvoices: number
  }

  export type PartnerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    supplierInvoices?: boolean | PartnerCountOutputTypeCountSupplierInvoicesArgs
    buyerInvoices?: boolean | PartnerCountOutputTypeCountBuyerInvoicesArgs
  }

  // Custom InputTypes
  /**
   * PartnerCountOutputType without action
   */
  export type PartnerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerCountOutputType
     */
    select?: PartnerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PartnerCountOutputType without action
   */
  export type PartnerCountOutputTypeCountSupplierInvoicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceWhereInput
  }

  /**
   * PartnerCountOutputType without action
   */
  export type PartnerCountOutputTypeCountBuyerInvoicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceWhereInput
  }


  /**
   * Count Type InvoiceLineCountOutputType
   */

  export type InvoiceLineCountOutputType = {
    allowances: number
  }

  export type InvoiceLineCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    allowances?: boolean | InvoiceLineCountOutputTypeCountAllowancesArgs
  }

  // Custom InputTypes
  /**
   * InvoiceLineCountOutputType without action
   */
  export type InvoiceLineCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceLineCountOutputType
     */
    select?: InvoiceLineCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InvoiceLineCountOutputType without action
   */
  export type InvoiceLineCountOutputTypeCountAllowancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AllowanceChargeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    passwordHash: string | null
    emailVerified: boolean | null
    verificationCode: string | null
    verificationCodeExpires: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    passwordHash: string | null
    emailVerified: boolean | null
    verificationCode: string | null
    verificationCodeExpires: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    passwordHash: number
    emailVerified: number
    verificationCode: number
    verificationCodeExpires: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    emailVerified?: true
    verificationCode?: true
    verificationCodeExpires?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    emailVerified?: true
    verificationCode?: true
    verificationCodeExpires?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    emailVerified?: true
    verificationCode?: true
    verificationCodeExpires?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string
    passwordHash: string
    emailVerified: boolean
    verificationCode: string | null
    verificationCodeExpires: Date | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    emailVerified?: boolean
    verificationCode?: boolean
    verificationCodeExpires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    invoices?: boolean | User$invoicesArgs<ExtArgs>
    refreshTokens?: boolean | User$refreshTokensArgs<ExtArgs>
    signature?: boolean | User$signatureArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    emailVerified?: boolean
    verificationCode?: boolean
    verificationCodeExpires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    emailVerified?: boolean
    verificationCode?: boolean
    verificationCodeExpires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invoices?: boolean | User$invoicesArgs<ExtArgs>
    refreshTokens?: boolean | User$refreshTokensArgs<ExtArgs>
    signature?: boolean | User$signatureArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      invoices: Prisma.$InvoicePayload<ExtArgs>[]
      refreshTokens: Prisma.$RefreshTokenPayload<ExtArgs>[]
      signature: Prisma.$UserSignaturePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      passwordHash: string
      emailVerified: boolean
      verificationCode: string | null
      verificationCodeExpires: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    invoices<T extends User$invoicesArgs<ExtArgs> = {}>(args?: Subset<T, User$invoicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findMany"> | Null>
    refreshTokens<T extends User$refreshTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$refreshTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany"> | Null>
    signature<T extends User$signatureArgs<ExtArgs> = {}>(args?: Subset<T, User$signatureArgs<ExtArgs>>): Prisma__UserSignatureClient<$Result.GetResult<Prisma.$UserSignaturePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly verificationCode: FieldRef<"User", 'String'>
    readonly verificationCodeExpires: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.invoices
   */
  export type User$invoicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    where?: InvoiceWhereInput
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    cursor?: InvoiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * User.refreshTokens
   */
  export type User$refreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    cursor?: RefreshTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * User.signature
   */
  export type User$signatureArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSignature
     */
    select?: UserSignatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSignatureInclude<ExtArgs> | null
    where?: UserSignatureWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model UserSignature
   */

  export type AggregateUserSignature = {
    _count: UserSignatureCountAggregateOutputType | null
    _min: UserSignatureMinAggregateOutputType | null
    _max: UserSignatureMaxAggregateOutputType | null
  }

  export type UserSignatureMinAggregateOutputType = {
    id: string | null
    userId: string | null
    certificateFilename: string | null
    encryptedContent: string | null
    signaturePinHash: string | null
    certificateSubject: string | null
    certificateIssuer: string | null
    certificateSerialNumber: string | null
    certificateValidFrom: Date | null
    certificateValidUntil: Date | null
    keyAlgorithm: string | null
    status: string | null
    uploadedAt: Date | null
    lastUsedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserSignatureMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    certificateFilename: string | null
    encryptedContent: string | null
    signaturePinHash: string | null
    certificateSubject: string | null
    certificateIssuer: string | null
    certificateSerialNumber: string | null
    certificateValidFrom: Date | null
    certificateValidUntil: Date | null
    keyAlgorithm: string | null
    status: string | null
    uploadedAt: Date | null
    lastUsedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserSignatureCountAggregateOutputType = {
    id: number
    userId: number
    certificateFilename: number
    encryptedContent: number
    signaturePinHash: number
    certificateSubject: number
    certificateIssuer: number
    certificateSerialNumber: number
    certificateValidFrom: number
    certificateValidUntil: number
    keyAlgorithm: number
    status: number
    uploadedAt: number
    lastUsedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserSignatureMinAggregateInputType = {
    id?: true
    userId?: true
    certificateFilename?: true
    encryptedContent?: true
    signaturePinHash?: true
    certificateSubject?: true
    certificateIssuer?: true
    certificateSerialNumber?: true
    certificateValidFrom?: true
    certificateValidUntil?: true
    keyAlgorithm?: true
    status?: true
    uploadedAt?: true
    lastUsedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserSignatureMaxAggregateInputType = {
    id?: true
    userId?: true
    certificateFilename?: true
    encryptedContent?: true
    signaturePinHash?: true
    certificateSubject?: true
    certificateIssuer?: true
    certificateSerialNumber?: true
    certificateValidFrom?: true
    certificateValidUntil?: true
    keyAlgorithm?: true
    status?: true
    uploadedAt?: true
    lastUsedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserSignatureCountAggregateInputType = {
    id?: true
    userId?: true
    certificateFilename?: true
    encryptedContent?: true
    signaturePinHash?: true
    certificateSubject?: true
    certificateIssuer?: true
    certificateSerialNumber?: true
    certificateValidFrom?: true
    certificateValidUntil?: true
    keyAlgorithm?: true
    status?: true
    uploadedAt?: true
    lastUsedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserSignatureAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserSignature to aggregate.
     */
    where?: UserSignatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSignatures to fetch.
     */
    orderBy?: UserSignatureOrderByWithRelationInput | UserSignatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserSignatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSignatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSignatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserSignatures
    **/
    _count?: true | UserSignatureCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserSignatureMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserSignatureMaxAggregateInputType
  }

  export type GetUserSignatureAggregateType<T extends UserSignatureAggregateArgs> = {
        [P in keyof T & keyof AggregateUserSignature]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserSignature[P]>
      : GetScalarType<T[P], AggregateUserSignature[P]>
  }




  export type UserSignatureGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserSignatureWhereInput
    orderBy?: UserSignatureOrderByWithAggregationInput | UserSignatureOrderByWithAggregationInput[]
    by: UserSignatureScalarFieldEnum[] | UserSignatureScalarFieldEnum
    having?: UserSignatureScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserSignatureCountAggregateInputType | true
    _min?: UserSignatureMinAggregateInputType
    _max?: UserSignatureMaxAggregateInputType
  }

  export type UserSignatureGroupByOutputType = {
    id: string
    userId: string
    certificateFilename: string
    encryptedContent: string
    signaturePinHash: string
    certificateSubject: string | null
    certificateIssuer: string | null
    certificateSerialNumber: string | null
    certificateValidFrom: Date | null
    certificateValidUntil: Date | null
    keyAlgorithm: string | null
    status: string
    uploadedAt: Date
    lastUsedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: UserSignatureCountAggregateOutputType | null
    _min: UserSignatureMinAggregateOutputType | null
    _max: UserSignatureMaxAggregateOutputType | null
  }

  type GetUserSignatureGroupByPayload<T extends UserSignatureGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserSignatureGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserSignatureGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserSignatureGroupByOutputType[P]>
            : GetScalarType<T[P], UserSignatureGroupByOutputType[P]>
        }
      >
    >


  export type UserSignatureSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    certificateFilename?: boolean
    encryptedContent?: boolean
    signaturePinHash?: boolean
    certificateSubject?: boolean
    certificateIssuer?: boolean
    certificateSerialNumber?: boolean
    certificateValidFrom?: boolean
    certificateValidUntil?: boolean
    keyAlgorithm?: boolean
    status?: boolean
    uploadedAt?: boolean
    lastUsedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSignature"]>

  export type UserSignatureSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    certificateFilename?: boolean
    encryptedContent?: boolean
    signaturePinHash?: boolean
    certificateSubject?: boolean
    certificateIssuer?: boolean
    certificateSerialNumber?: boolean
    certificateValidFrom?: boolean
    certificateValidUntil?: boolean
    keyAlgorithm?: boolean
    status?: boolean
    uploadedAt?: boolean
    lastUsedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSignature"]>

  export type UserSignatureSelectScalar = {
    id?: boolean
    userId?: boolean
    certificateFilename?: boolean
    encryptedContent?: boolean
    signaturePinHash?: boolean
    certificateSubject?: boolean
    certificateIssuer?: boolean
    certificateSerialNumber?: boolean
    certificateValidFrom?: boolean
    certificateValidUntil?: boolean
    keyAlgorithm?: boolean
    status?: boolean
    uploadedAt?: boolean
    lastUsedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserSignatureInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserSignatureIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserSignaturePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserSignature"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      certificateFilename: string
      encryptedContent: string
      signaturePinHash: string
      certificateSubject: string | null
      certificateIssuer: string | null
      certificateSerialNumber: string | null
      certificateValidFrom: Date | null
      certificateValidUntil: Date | null
      keyAlgorithm: string | null
      status: string
      uploadedAt: Date
      lastUsedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userSignature"]>
    composites: {}
  }

  type UserSignatureGetPayload<S extends boolean | null | undefined | UserSignatureDefaultArgs> = $Result.GetResult<Prisma.$UserSignaturePayload, S>

  type UserSignatureCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserSignatureFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserSignatureCountAggregateInputType | true
    }

  export interface UserSignatureDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserSignature'], meta: { name: 'UserSignature' } }
    /**
     * Find zero or one UserSignature that matches the filter.
     * @param {UserSignatureFindUniqueArgs} args - Arguments to find a UserSignature
     * @example
     * // Get one UserSignature
     * const userSignature = await prisma.userSignature.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserSignatureFindUniqueArgs>(args: SelectSubset<T, UserSignatureFindUniqueArgs<ExtArgs>>): Prisma__UserSignatureClient<$Result.GetResult<Prisma.$UserSignaturePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one UserSignature that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserSignatureFindUniqueOrThrowArgs} args - Arguments to find a UserSignature
     * @example
     * // Get one UserSignature
     * const userSignature = await prisma.userSignature.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserSignatureFindUniqueOrThrowArgs>(args: SelectSubset<T, UserSignatureFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserSignatureClient<$Result.GetResult<Prisma.$UserSignaturePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first UserSignature that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSignatureFindFirstArgs} args - Arguments to find a UserSignature
     * @example
     * // Get one UserSignature
     * const userSignature = await prisma.userSignature.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserSignatureFindFirstArgs>(args?: SelectSubset<T, UserSignatureFindFirstArgs<ExtArgs>>): Prisma__UserSignatureClient<$Result.GetResult<Prisma.$UserSignaturePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first UserSignature that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSignatureFindFirstOrThrowArgs} args - Arguments to find a UserSignature
     * @example
     * // Get one UserSignature
     * const userSignature = await prisma.userSignature.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserSignatureFindFirstOrThrowArgs>(args?: SelectSubset<T, UserSignatureFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserSignatureClient<$Result.GetResult<Prisma.$UserSignaturePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more UserSignatures that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSignatureFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserSignatures
     * const userSignatures = await prisma.userSignature.findMany()
     * 
     * // Get first 10 UserSignatures
     * const userSignatures = await prisma.userSignature.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userSignatureWithIdOnly = await prisma.userSignature.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserSignatureFindManyArgs>(args?: SelectSubset<T, UserSignatureFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSignaturePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a UserSignature.
     * @param {UserSignatureCreateArgs} args - Arguments to create a UserSignature.
     * @example
     * // Create one UserSignature
     * const UserSignature = await prisma.userSignature.create({
     *   data: {
     *     // ... data to create a UserSignature
     *   }
     * })
     * 
     */
    create<T extends UserSignatureCreateArgs>(args: SelectSubset<T, UserSignatureCreateArgs<ExtArgs>>): Prisma__UserSignatureClient<$Result.GetResult<Prisma.$UserSignaturePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many UserSignatures.
     * @param {UserSignatureCreateManyArgs} args - Arguments to create many UserSignatures.
     * @example
     * // Create many UserSignatures
     * const userSignature = await prisma.userSignature.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserSignatureCreateManyArgs>(args?: SelectSubset<T, UserSignatureCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserSignatures and returns the data saved in the database.
     * @param {UserSignatureCreateManyAndReturnArgs} args - Arguments to create many UserSignatures.
     * @example
     * // Create many UserSignatures
     * const userSignature = await prisma.userSignature.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserSignatures and only return the `id`
     * const userSignatureWithIdOnly = await prisma.userSignature.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserSignatureCreateManyAndReturnArgs>(args?: SelectSubset<T, UserSignatureCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSignaturePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a UserSignature.
     * @param {UserSignatureDeleteArgs} args - Arguments to delete one UserSignature.
     * @example
     * // Delete one UserSignature
     * const UserSignature = await prisma.userSignature.delete({
     *   where: {
     *     // ... filter to delete one UserSignature
     *   }
     * })
     * 
     */
    delete<T extends UserSignatureDeleteArgs>(args: SelectSubset<T, UserSignatureDeleteArgs<ExtArgs>>): Prisma__UserSignatureClient<$Result.GetResult<Prisma.$UserSignaturePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one UserSignature.
     * @param {UserSignatureUpdateArgs} args - Arguments to update one UserSignature.
     * @example
     * // Update one UserSignature
     * const userSignature = await prisma.userSignature.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserSignatureUpdateArgs>(args: SelectSubset<T, UserSignatureUpdateArgs<ExtArgs>>): Prisma__UserSignatureClient<$Result.GetResult<Prisma.$UserSignaturePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more UserSignatures.
     * @param {UserSignatureDeleteManyArgs} args - Arguments to filter UserSignatures to delete.
     * @example
     * // Delete a few UserSignatures
     * const { count } = await prisma.userSignature.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserSignatureDeleteManyArgs>(args?: SelectSubset<T, UserSignatureDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserSignatures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSignatureUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserSignatures
     * const userSignature = await prisma.userSignature.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserSignatureUpdateManyArgs>(args: SelectSubset<T, UserSignatureUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserSignature.
     * @param {UserSignatureUpsertArgs} args - Arguments to update or create a UserSignature.
     * @example
     * // Update or create a UserSignature
     * const userSignature = await prisma.userSignature.upsert({
     *   create: {
     *     // ... data to create a UserSignature
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserSignature we want to update
     *   }
     * })
     */
    upsert<T extends UserSignatureUpsertArgs>(args: SelectSubset<T, UserSignatureUpsertArgs<ExtArgs>>): Prisma__UserSignatureClient<$Result.GetResult<Prisma.$UserSignaturePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of UserSignatures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSignatureCountArgs} args - Arguments to filter UserSignatures to count.
     * @example
     * // Count the number of UserSignatures
     * const count = await prisma.userSignature.count({
     *   where: {
     *     // ... the filter for the UserSignatures we want to count
     *   }
     * })
    **/
    count<T extends UserSignatureCountArgs>(
      args?: Subset<T, UserSignatureCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserSignatureCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserSignature.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSignatureAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserSignatureAggregateArgs>(args: Subset<T, UserSignatureAggregateArgs>): Prisma.PrismaPromise<GetUserSignatureAggregateType<T>>

    /**
     * Group by UserSignature.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSignatureGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserSignatureGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserSignatureGroupByArgs['orderBy'] }
        : { orderBy?: UserSignatureGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserSignatureGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserSignatureGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserSignature model
   */
  readonly fields: UserSignatureFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserSignature.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserSignatureClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserSignature model
   */ 
  interface UserSignatureFieldRefs {
    readonly id: FieldRef<"UserSignature", 'String'>
    readonly userId: FieldRef<"UserSignature", 'String'>
    readonly certificateFilename: FieldRef<"UserSignature", 'String'>
    readonly encryptedContent: FieldRef<"UserSignature", 'String'>
    readonly signaturePinHash: FieldRef<"UserSignature", 'String'>
    readonly certificateSubject: FieldRef<"UserSignature", 'String'>
    readonly certificateIssuer: FieldRef<"UserSignature", 'String'>
    readonly certificateSerialNumber: FieldRef<"UserSignature", 'String'>
    readonly certificateValidFrom: FieldRef<"UserSignature", 'DateTime'>
    readonly certificateValidUntil: FieldRef<"UserSignature", 'DateTime'>
    readonly keyAlgorithm: FieldRef<"UserSignature", 'String'>
    readonly status: FieldRef<"UserSignature", 'String'>
    readonly uploadedAt: FieldRef<"UserSignature", 'DateTime'>
    readonly lastUsedAt: FieldRef<"UserSignature", 'DateTime'>
    readonly createdAt: FieldRef<"UserSignature", 'DateTime'>
    readonly updatedAt: FieldRef<"UserSignature", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserSignature findUnique
   */
  export type UserSignatureFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSignature
     */
    select?: UserSignatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSignatureInclude<ExtArgs> | null
    /**
     * Filter, which UserSignature to fetch.
     */
    where: UserSignatureWhereUniqueInput
  }

  /**
   * UserSignature findUniqueOrThrow
   */
  export type UserSignatureFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSignature
     */
    select?: UserSignatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSignatureInclude<ExtArgs> | null
    /**
     * Filter, which UserSignature to fetch.
     */
    where: UserSignatureWhereUniqueInput
  }

  /**
   * UserSignature findFirst
   */
  export type UserSignatureFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSignature
     */
    select?: UserSignatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSignatureInclude<ExtArgs> | null
    /**
     * Filter, which UserSignature to fetch.
     */
    where?: UserSignatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSignatures to fetch.
     */
    orderBy?: UserSignatureOrderByWithRelationInput | UserSignatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSignatures.
     */
    cursor?: UserSignatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSignatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSignatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSignatures.
     */
    distinct?: UserSignatureScalarFieldEnum | UserSignatureScalarFieldEnum[]
  }

  /**
   * UserSignature findFirstOrThrow
   */
  export type UserSignatureFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSignature
     */
    select?: UserSignatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSignatureInclude<ExtArgs> | null
    /**
     * Filter, which UserSignature to fetch.
     */
    where?: UserSignatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSignatures to fetch.
     */
    orderBy?: UserSignatureOrderByWithRelationInput | UserSignatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSignatures.
     */
    cursor?: UserSignatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSignatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSignatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSignatures.
     */
    distinct?: UserSignatureScalarFieldEnum | UserSignatureScalarFieldEnum[]
  }

  /**
   * UserSignature findMany
   */
  export type UserSignatureFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSignature
     */
    select?: UserSignatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSignatureInclude<ExtArgs> | null
    /**
     * Filter, which UserSignatures to fetch.
     */
    where?: UserSignatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSignatures to fetch.
     */
    orderBy?: UserSignatureOrderByWithRelationInput | UserSignatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserSignatures.
     */
    cursor?: UserSignatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSignatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSignatures.
     */
    skip?: number
    distinct?: UserSignatureScalarFieldEnum | UserSignatureScalarFieldEnum[]
  }

  /**
   * UserSignature create
   */
  export type UserSignatureCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSignature
     */
    select?: UserSignatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSignatureInclude<ExtArgs> | null
    /**
     * The data needed to create a UserSignature.
     */
    data: XOR<UserSignatureCreateInput, UserSignatureUncheckedCreateInput>
  }

  /**
   * UserSignature createMany
   */
  export type UserSignatureCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserSignatures.
     */
    data: UserSignatureCreateManyInput | UserSignatureCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserSignature createManyAndReturn
   */
  export type UserSignatureCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSignature
     */
    select?: UserSignatureSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many UserSignatures.
     */
    data: UserSignatureCreateManyInput | UserSignatureCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSignatureIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserSignature update
   */
  export type UserSignatureUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSignature
     */
    select?: UserSignatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSignatureInclude<ExtArgs> | null
    /**
     * The data needed to update a UserSignature.
     */
    data: XOR<UserSignatureUpdateInput, UserSignatureUncheckedUpdateInput>
    /**
     * Choose, which UserSignature to update.
     */
    where: UserSignatureWhereUniqueInput
  }

  /**
   * UserSignature updateMany
   */
  export type UserSignatureUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserSignatures.
     */
    data: XOR<UserSignatureUpdateManyMutationInput, UserSignatureUncheckedUpdateManyInput>
    /**
     * Filter which UserSignatures to update
     */
    where?: UserSignatureWhereInput
  }

  /**
   * UserSignature upsert
   */
  export type UserSignatureUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSignature
     */
    select?: UserSignatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSignatureInclude<ExtArgs> | null
    /**
     * The filter to search for the UserSignature to update in case it exists.
     */
    where: UserSignatureWhereUniqueInput
    /**
     * In case the UserSignature found by the `where` argument doesn't exist, create a new UserSignature with this data.
     */
    create: XOR<UserSignatureCreateInput, UserSignatureUncheckedCreateInput>
    /**
     * In case the UserSignature was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserSignatureUpdateInput, UserSignatureUncheckedUpdateInput>
  }

  /**
   * UserSignature delete
   */
  export type UserSignatureDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSignature
     */
    select?: UserSignatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSignatureInclude<ExtArgs> | null
    /**
     * Filter which UserSignature to delete.
     */
    where: UserSignatureWhereUniqueInput
  }

  /**
   * UserSignature deleteMany
   */
  export type UserSignatureDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserSignatures to delete
     */
    where?: UserSignatureWhereInput
  }

  /**
   * UserSignature without action
   */
  export type UserSignatureDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSignature
     */
    select?: UserSignatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSignatureInclude<ExtArgs> | null
  }


  /**
   * Model SignatureAudit
   */

  export type AggregateSignatureAudit = {
    _count: SignatureAuditCountAggregateOutputType | null
    _min: SignatureAuditMinAggregateOutputType | null
    _max: SignatureAuditMaxAggregateOutputType | null
  }

  export type SignatureAuditMinAggregateOutputType = {
    id: string | null
    userId: string | null
    action: string | null
    invoiceId: string | null
    documentNumber: string | null
    status: string | null
    errorMessage: string | null
    certificateUsed: string | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type SignatureAuditMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    action: string | null
    invoiceId: string | null
    documentNumber: string | null
    status: string | null
    errorMessage: string | null
    certificateUsed: string | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type SignatureAuditCountAggregateOutputType = {
    id: number
    userId: number
    action: number
    invoiceId: number
    documentNumber: number
    status: number
    errorMessage: number
    certificateUsed: number
    ipAddress: number
    userAgent: number
    createdAt: number
    _all: number
  }


  export type SignatureAuditMinAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    invoiceId?: true
    documentNumber?: true
    status?: true
    errorMessage?: true
    certificateUsed?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
  }

  export type SignatureAuditMaxAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    invoiceId?: true
    documentNumber?: true
    status?: true
    errorMessage?: true
    certificateUsed?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
  }

  export type SignatureAuditCountAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    invoiceId?: true
    documentNumber?: true
    status?: true
    errorMessage?: true
    certificateUsed?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
    _all?: true
  }

  export type SignatureAuditAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SignatureAudit to aggregate.
     */
    where?: SignatureAuditWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SignatureAudits to fetch.
     */
    orderBy?: SignatureAuditOrderByWithRelationInput | SignatureAuditOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SignatureAuditWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SignatureAudits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SignatureAudits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SignatureAudits
    **/
    _count?: true | SignatureAuditCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SignatureAuditMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SignatureAuditMaxAggregateInputType
  }

  export type GetSignatureAuditAggregateType<T extends SignatureAuditAggregateArgs> = {
        [P in keyof T & keyof AggregateSignatureAudit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSignatureAudit[P]>
      : GetScalarType<T[P], AggregateSignatureAudit[P]>
  }




  export type SignatureAuditGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SignatureAuditWhereInput
    orderBy?: SignatureAuditOrderByWithAggregationInput | SignatureAuditOrderByWithAggregationInput[]
    by: SignatureAuditScalarFieldEnum[] | SignatureAuditScalarFieldEnum
    having?: SignatureAuditScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SignatureAuditCountAggregateInputType | true
    _min?: SignatureAuditMinAggregateInputType
    _max?: SignatureAuditMaxAggregateInputType
  }

  export type SignatureAuditGroupByOutputType = {
    id: string
    userId: string
    action: string
    invoiceId: string | null
    documentNumber: string | null
    status: string
    errorMessage: string | null
    certificateUsed: string | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date
    _count: SignatureAuditCountAggregateOutputType | null
    _min: SignatureAuditMinAggregateOutputType | null
    _max: SignatureAuditMaxAggregateOutputType | null
  }

  type GetSignatureAuditGroupByPayload<T extends SignatureAuditGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SignatureAuditGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SignatureAuditGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SignatureAuditGroupByOutputType[P]>
            : GetScalarType<T[P], SignatureAuditGroupByOutputType[P]>
        }
      >
    >


  export type SignatureAuditSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    invoiceId?: boolean
    documentNumber?: boolean
    status?: boolean
    errorMessage?: boolean
    certificateUsed?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["signatureAudit"]>

  export type SignatureAuditSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    invoiceId?: boolean
    documentNumber?: boolean
    status?: boolean
    errorMessage?: boolean
    certificateUsed?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["signatureAudit"]>

  export type SignatureAuditSelectScalar = {
    id?: boolean
    userId?: boolean
    action?: boolean
    invoiceId?: boolean
    documentNumber?: boolean
    status?: boolean
    errorMessage?: boolean
    certificateUsed?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
  }


  export type $SignatureAuditPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SignatureAudit"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      action: string
      invoiceId: string | null
      documentNumber: string | null
      status: string
      errorMessage: string | null
      certificateUsed: string | null
      ipAddress: string | null
      userAgent: string | null
      createdAt: Date
    }, ExtArgs["result"]["signatureAudit"]>
    composites: {}
  }

  type SignatureAuditGetPayload<S extends boolean | null | undefined | SignatureAuditDefaultArgs> = $Result.GetResult<Prisma.$SignatureAuditPayload, S>

  type SignatureAuditCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SignatureAuditFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SignatureAuditCountAggregateInputType | true
    }

  export interface SignatureAuditDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SignatureAudit'], meta: { name: 'SignatureAudit' } }
    /**
     * Find zero or one SignatureAudit that matches the filter.
     * @param {SignatureAuditFindUniqueArgs} args - Arguments to find a SignatureAudit
     * @example
     * // Get one SignatureAudit
     * const signatureAudit = await prisma.signatureAudit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SignatureAuditFindUniqueArgs>(args: SelectSubset<T, SignatureAuditFindUniqueArgs<ExtArgs>>): Prisma__SignatureAuditClient<$Result.GetResult<Prisma.$SignatureAuditPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SignatureAudit that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SignatureAuditFindUniqueOrThrowArgs} args - Arguments to find a SignatureAudit
     * @example
     * // Get one SignatureAudit
     * const signatureAudit = await prisma.signatureAudit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SignatureAuditFindUniqueOrThrowArgs>(args: SelectSubset<T, SignatureAuditFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SignatureAuditClient<$Result.GetResult<Prisma.$SignatureAuditPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SignatureAudit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignatureAuditFindFirstArgs} args - Arguments to find a SignatureAudit
     * @example
     * // Get one SignatureAudit
     * const signatureAudit = await prisma.signatureAudit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SignatureAuditFindFirstArgs>(args?: SelectSubset<T, SignatureAuditFindFirstArgs<ExtArgs>>): Prisma__SignatureAuditClient<$Result.GetResult<Prisma.$SignatureAuditPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SignatureAudit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignatureAuditFindFirstOrThrowArgs} args - Arguments to find a SignatureAudit
     * @example
     * // Get one SignatureAudit
     * const signatureAudit = await prisma.signatureAudit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SignatureAuditFindFirstOrThrowArgs>(args?: SelectSubset<T, SignatureAuditFindFirstOrThrowArgs<ExtArgs>>): Prisma__SignatureAuditClient<$Result.GetResult<Prisma.$SignatureAuditPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SignatureAudits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignatureAuditFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SignatureAudits
     * const signatureAudits = await prisma.signatureAudit.findMany()
     * 
     * // Get first 10 SignatureAudits
     * const signatureAudits = await prisma.signatureAudit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const signatureAuditWithIdOnly = await prisma.signatureAudit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SignatureAuditFindManyArgs>(args?: SelectSubset<T, SignatureAuditFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SignatureAuditPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SignatureAudit.
     * @param {SignatureAuditCreateArgs} args - Arguments to create a SignatureAudit.
     * @example
     * // Create one SignatureAudit
     * const SignatureAudit = await prisma.signatureAudit.create({
     *   data: {
     *     // ... data to create a SignatureAudit
     *   }
     * })
     * 
     */
    create<T extends SignatureAuditCreateArgs>(args: SelectSubset<T, SignatureAuditCreateArgs<ExtArgs>>): Prisma__SignatureAuditClient<$Result.GetResult<Prisma.$SignatureAuditPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SignatureAudits.
     * @param {SignatureAuditCreateManyArgs} args - Arguments to create many SignatureAudits.
     * @example
     * // Create many SignatureAudits
     * const signatureAudit = await prisma.signatureAudit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SignatureAuditCreateManyArgs>(args?: SelectSubset<T, SignatureAuditCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SignatureAudits and returns the data saved in the database.
     * @param {SignatureAuditCreateManyAndReturnArgs} args - Arguments to create many SignatureAudits.
     * @example
     * // Create many SignatureAudits
     * const signatureAudit = await prisma.signatureAudit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SignatureAudits and only return the `id`
     * const signatureAuditWithIdOnly = await prisma.signatureAudit.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SignatureAuditCreateManyAndReturnArgs>(args?: SelectSubset<T, SignatureAuditCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SignatureAuditPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SignatureAudit.
     * @param {SignatureAuditDeleteArgs} args - Arguments to delete one SignatureAudit.
     * @example
     * // Delete one SignatureAudit
     * const SignatureAudit = await prisma.signatureAudit.delete({
     *   where: {
     *     // ... filter to delete one SignatureAudit
     *   }
     * })
     * 
     */
    delete<T extends SignatureAuditDeleteArgs>(args: SelectSubset<T, SignatureAuditDeleteArgs<ExtArgs>>): Prisma__SignatureAuditClient<$Result.GetResult<Prisma.$SignatureAuditPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SignatureAudit.
     * @param {SignatureAuditUpdateArgs} args - Arguments to update one SignatureAudit.
     * @example
     * // Update one SignatureAudit
     * const signatureAudit = await prisma.signatureAudit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SignatureAuditUpdateArgs>(args: SelectSubset<T, SignatureAuditUpdateArgs<ExtArgs>>): Prisma__SignatureAuditClient<$Result.GetResult<Prisma.$SignatureAuditPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SignatureAudits.
     * @param {SignatureAuditDeleteManyArgs} args - Arguments to filter SignatureAudits to delete.
     * @example
     * // Delete a few SignatureAudits
     * const { count } = await prisma.signatureAudit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SignatureAuditDeleteManyArgs>(args?: SelectSubset<T, SignatureAuditDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SignatureAudits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignatureAuditUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SignatureAudits
     * const signatureAudit = await prisma.signatureAudit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SignatureAuditUpdateManyArgs>(args: SelectSubset<T, SignatureAuditUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SignatureAudit.
     * @param {SignatureAuditUpsertArgs} args - Arguments to update or create a SignatureAudit.
     * @example
     * // Update or create a SignatureAudit
     * const signatureAudit = await prisma.signatureAudit.upsert({
     *   create: {
     *     // ... data to create a SignatureAudit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SignatureAudit we want to update
     *   }
     * })
     */
    upsert<T extends SignatureAuditUpsertArgs>(args: SelectSubset<T, SignatureAuditUpsertArgs<ExtArgs>>): Prisma__SignatureAuditClient<$Result.GetResult<Prisma.$SignatureAuditPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SignatureAudits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignatureAuditCountArgs} args - Arguments to filter SignatureAudits to count.
     * @example
     * // Count the number of SignatureAudits
     * const count = await prisma.signatureAudit.count({
     *   where: {
     *     // ... the filter for the SignatureAudits we want to count
     *   }
     * })
    **/
    count<T extends SignatureAuditCountArgs>(
      args?: Subset<T, SignatureAuditCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SignatureAuditCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SignatureAudit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignatureAuditAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SignatureAuditAggregateArgs>(args: Subset<T, SignatureAuditAggregateArgs>): Prisma.PrismaPromise<GetSignatureAuditAggregateType<T>>

    /**
     * Group by SignatureAudit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignatureAuditGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SignatureAuditGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SignatureAuditGroupByArgs['orderBy'] }
        : { orderBy?: SignatureAuditGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SignatureAuditGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSignatureAuditGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SignatureAudit model
   */
  readonly fields: SignatureAuditFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SignatureAudit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SignatureAuditClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SignatureAudit model
   */ 
  interface SignatureAuditFieldRefs {
    readonly id: FieldRef<"SignatureAudit", 'String'>
    readonly userId: FieldRef<"SignatureAudit", 'String'>
    readonly action: FieldRef<"SignatureAudit", 'String'>
    readonly invoiceId: FieldRef<"SignatureAudit", 'String'>
    readonly documentNumber: FieldRef<"SignatureAudit", 'String'>
    readonly status: FieldRef<"SignatureAudit", 'String'>
    readonly errorMessage: FieldRef<"SignatureAudit", 'String'>
    readonly certificateUsed: FieldRef<"SignatureAudit", 'String'>
    readonly ipAddress: FieldRef<"SignatureAudit", 'String'>
    readonly userAgent: FieldRef<"SignatureAudit", 'String'>
    readonly createdAt: FieldRef<"SignatureAudit", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SignatureAudit findUnique
   */
  export type SignatureAuditFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignatureAudit
     */
    select?: SignatureAuditSelect<ExtArgs> | null
    /**
     * Filter, which SignatureAudit to fetch.
     */
    where: SignatureAuditWhereUniqueInput
  }

  /**
   * SignatureAudit findUniqueOrThrow
   */
  export type SignatureAuditFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignatureAudit
     */
    select?: SignatureAuditSelect<ExtArgs> | null
    /**
     * Filter, which SignatureAudit to fetch.
     */
    where: SignatureAuditWhereUniqueInput
  }

  /**
   * SignatureAudit findFirst
   */
  export type SignatureAuditFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignatureAudit
     */
    select?: SignatureAuditSelect<ExtArgs> | null
    /**
     * Filter, which SignatureAudit to fetch.
     */
    where?: SignatureAuditWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SignatureAudits to fetch.
     */
    orderBy?: SignatureAuditOrderByWithRelationInput | SignatureAuditOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SignatureAudits.
     */
    cursor?: SignatureAuditWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SignatureAudits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SignatureAudits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SignatureAudits.
     */
    distinct?: SignatureAuditScalarFieldEnum | SignatureAuditScalarFieldEnum[]
  }

  /**
   * SignatureAudit findFirstOrThrow
   */
  export type SignatureAuditFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignatureAudit
     */
    select?: SignatureAuditSelect<ExtArgs> | null
    /**
     * Filter, which SignatureAudit to fetch.
     */
    where?: SignatureAuditWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SignatureAudits to fetch.
     */
    orderBy?: SignatureAuditOrderByWithRelationInput | SignatureAuditOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SignatureAudits.
     */
    cursor?: SignatureAuditWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SignatureAudits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SignatureAudits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SignatureAudits.
     */
    distinct?: SignatureAuditScalarFieldEnum | SignatureAuditScalarFieldEnum[]
  }

  /**
   * SignatureAudit findMany
   */
  export type SignatureAuditFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignatureAudit
     */
    select?: SignatureAuditSelect<ExtArgs> | null
    /**
     * Filter, which SignatureAudits to fetch.
     */
    where?: SignatureAuditWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SignatureAudits to fetch.
     */
    orderBy?: SignatureAuditOrderByWithRelationInput | SignatureAuditOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SignatureAudits.
     */
    cursor?: SignatureAuditWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SignatureAudits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SignatureAudits.
     */
    skip?: number
    distinct?: SignatureAuditScalarFieldEnum | SignatureAuditScalarFieldEnum[]
  }

  /**
   * SignatureAudit create
   */
  export type SignatureAuditCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignatureAudit
     */
    select?: SignatureAuditSelect<ExtArgs> | null
    /**
     * The data needed to create a SignatureAudit.
     */
    data: XOR<SignatureAuditCreateInput, SignatureAuditUncheckedCreateInput>
  }

  /**
   * SignatureAudit createMany
   */
  export type SignatureAuditCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SignatureAudits.
     */
    data: SignatureAuditCreateManyInput | SignatureAuditCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SignatureAudit createManyAndReturn
   */
  export type SignatureAuditCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignatureAudit
     */
    select?: SignatureAuditSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SignatureAudits.
     */
    data: SignatureAuditCreateManyInput | SignatureAuditCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SignatureAudit update
   */
  export type SignatureAuditUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignatureAudit
     */
    select?: SignatureAuditSelect<ExtArgs> | null
    /**
     * The data needed to update a SignatureAudit.
     */
    data: XOR<SignatureAuditUpdateInput, SignatureAuditUncheckedUpdateInput>
    /**
     * Choose, which SignatureAudit to update.
     */
    where: SignatureAuditWhereUniqueInput
  }

  /**
   * SignatureAudit updateMany
   */
  export type SignatureAuditUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SignatureAudits.
     */
    data: XOR<SignatureAuditUpdateManyMutationInput, SignatureAuditUncheckedUpdateManyInput>
    /**
     * Filter which SignatureAudits to update
     */
    where?: SignatureAuditWhereInput
  }

  /**
   * SignatureAudit upsert
   */
  export type SignatureAuditUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignatureAudit
     */
    select?: SignatureAuditSelect<ExtArgs> | null
    /**
     * The filter to search for the SignatureAudit to update in case it exists.
     */
    where: SignatureAuditWhereUniqueInput
    /**
     * In case the SignatureAudit found by the `where` argument doesn't exist, create a new SignatureAudit with this data.
     */
    create: XOR<SignatureAuditCreateInput, SignatureAuditUncheckedCreateInput>
    /**
     * In case the SignatureAudit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SignatureAuditUpdateInput, SignatureAuditUncheckedUpdateInput>
  }

  /**
   * SignatureAudit delete
   */
  export type SignatureAuditDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignatureAudit
     */
    select?: SignatureAuditSelect<ExtArgs> | null
    /**
     * Filter which SignatureAudit to delete.
     */
    where: SignatureAuditWhereUniqueInput
  }

  /**
   * SignatureAudit deleteMany
   */
  export type SignatureAuditDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SignatureAudits to delete
     */
    where?: SignatureAuditWhereInput
  }

  /**
   * SignatureAudit without action
   */
  export type SignatureAuditDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignatureAudit
     */
    select?: SignatureAuditSelect<ExtArgs> | null
  }


  /**
   * Model RefreshToken
   */

  export type AggregateRefreshToken = {
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  export type RefreshTokenMinAggregateOutputType = {
    id: string | null
    userId: string | null
    tokenHash: string | null
    expiresAt: Date | null
    createdAt: Date | null
    revokedAt: Date | null
  }

  export type RefreshTokenMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    tokenHash: string | null
    expiresAt: Date | null
    createdAt: Date | null
    revokedAt: Date | null
  }

  export type RefreshTokenCountAggregateOutputType = {
    id: number
    userId: number
    tokenHash: number
    expiresAt: number
    createdAt: number
    revokedAt: number
    _all: number
  }


  export type RefreshTokenMinAggregateInputType = {
    id?: true
    userId?: true
    tokenHash?: true
    expiresAt?: true
    createdAt?: true
    revokedAt?: true
  }

  export type RefreshTokenMaxAggregateInputType = {
    id?: true
    userId?: true
    tokenHash?: true
    expiresAt?: true
    createdAt?: true
    revokedAt?: true
  }

  export type RefreshTokenCountAggregateInputType = {
    id?: true
    userId?: true
    tokenHash?: true
    expiresAt?: true
    createdAt?: true
    revokedAt?: true
    _all?: true
  }

  export type RefreshTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshToken to aggregate.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RefreshTokens
    **/
    _count?: true | RefreshTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefreshTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type GetRefreshTokenAggregateType<T extends RefreshTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateRefreshToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefreshToken[P]>
      : GetScalarType<T[P], AggregateRefreshToken[P]>
  }




  export type RefreshTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithAggregationInput | RefreshTokenOrderByWithAggregationInput[]
    by: RefreshTokenScalarFieldEnum[] | RefreshTokenScalarFieldEnum
    having?: RefreshTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefreshTokenCountAggregateInputType | true
    _min?: RefreshTokenMinAggregateInputType
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type RefreshTokenGroupByOutputType = {
    id: string
    userId: string
    tokenHash: string
    expiresAt: Date
    createdAt: Date
    revokedAt: Date | null
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  type GetRefreshTokenGroupByPayload<T extends RefreshTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefreshTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefreshTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
            : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
        }
      >
    >


  export type RefreshTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tokenHash?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    revokedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tokenHash?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    revokedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectScalar = {
    id?: boolean
    userId?: boolean
    tokenHash?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    revokedAt?: boolean
  }

  export type RefreshTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RefreshTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RefreshToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      tokenHash: string
      expiresAt: Date
      createdAt: Date
      revokedAt: Date | null
    }, ExtArgs["result"]["refreshToken"]>
    composites: {}
  }

  type RefreshTokenGetPayload<S extends boolean | null | undefined | RefreshTokenDefaultArgs> = $Result.GetResult<Prisma.$RefreshTokenPayload, S>

  type RefreshTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RefreshTokenFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RefreshTokenCountAggregateInputType | true
    }

  export interface RefreshTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RefreshToken'], meta: { name: 'RefreshToken' } }
    /**
     * Find zero or one RefreshToken that matches the filter.
     * @param {RefreshTokenFindUniqueArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefreshTokenFindUniqueArgs>(args: SelectSubset<T, RefreshTokenFindUniqueArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RefreshToken that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RefreshTokenFindUniqueOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefreshTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, RefreshTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RefreshToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefreshTokenFindFirstArgs>(args?: SelectSubset<T, RefreshTokenFindFirstArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RefreshToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefreshTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, RefreshTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany()
     * 
     * // Get first 10 RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefreshTokenFindManyArgs>(args?: SelectSubset<T, RefreshTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RefreshToken.
     * @param {RefreshTokenCreateArgs} args - Arguments to create a RefreshToken.
     * @example
     * // Create one RefreshToken
     * const RefreshToken = await prisma.refreshToken.create({
     *   data: {
     *     // ... data to create a RefreshToken
     *   }
     * })
     * 
     */
    create<T extends RefreshTokenCreateArgs>(args: SelectSubset<T, RefreshTokenCreateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RefreshTokens.
     * @param {RefreshTokenCreateManyArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefreshTokenCreateManyArgs>(args?: SelectSubset<T, RefreshTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RefreshTokens and returns the data saved in the database.
     * @param {RefreshTokenCreateManyAndReturnArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RefreshTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, RefreshTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RefreshToken.
     * @param {RefreshTokenDeleteArgs} args - Arguments to delete one RefreshToken.
     * @example
     * // Delete one RefreshToken
     * const RefreshToken = await prisma.refreshToken.delete({
     *   where: {
     *     // ... filter to delete one RefreshToken
     *   }
     * })
     * 
     */
    delete<T extends RefreshTokenDeleteArgs>(args: SelectSubset<T, RefreshTokenDeleteArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RefreshToken.
     * @param {RefreshTokenUpdateArgs} args - Arguments to update one RefreshToken.
     * @example
     * // Update one RefreshToken
     * const refreshToken = await prisma.refreshToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefreshTokenUpdateArgs>(args: SelectSubset<T, RefreshTokenUpdateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RefreshTokens.
     * @param {RefreshTokenDeleteManyArgs} args - Arguments to filter RefreshTokens to delete.
     * @example
     * // Delete a few RefreshTokens
     * const { count } = await prisma.refreshToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefreshTokenDeleteManyArgs>(args?: SelectSubset<T, RefreshTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefreshTokenUpdateManyArgs>(args: SelectSubset<T, RefreshTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RefreshToken.
     * @param {RefreshTokenUpsertArgs} args - Arguments to update or create a RefreshToken.
     * @example
     * // Update or create a RefreshToken
     * const refreshToken = await prisma.refreshToken.upsert({
     *   create: {
     *     // ... data to create a RefreshToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefreshToken we want to update
     *   }
     * })
     */
    upsert<T extends RefreshTokenUpsertArgs>(args: SelectSubset<T, RefreshTokenUpsertArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenCountArgs} args - Arguments to filter RefreshTokens to count.
     * @example
     * // Count the number of RefreshTokens
     * const count = await prisma.refreshToken.count({
     *   where: {
     *     // ... the filter for the RefreshTokens we want to count
     *   }
     * })
    **/
    count<T extends RefreshTokenCountArgs>(
      args?: Subset<T, RefreshTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefreshTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RefreshTokenAggregateArgs>(args: Subset<T, RefreshTokenAggregateArgs>): Prisma.PrismaPromise<GetRefreshTokenAggregateType<T>>

    /**
     * Group by RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RefreshTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefreshTokenGroupByArgs['orderBy'] }
        : { orderBy?: RefreshTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RefreshTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefreshTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RefreshToken model
   */
  readonly fields: RefreshTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefreshToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefreshTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RefreshToken model
   */ 
  interface RefreshTokenFieldRefs {
    readonly id: FieldRef<"RefreshToken", 'String'>
    readonly userId: FieldRef<"RefreshToken", 'String'>
    readonly tokenHash: FieldRef<"RefreshToken", 'String'>
    readonly expiresAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly createdAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly revokedAt: FieldRef<"RefreshToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RefreshToken findUnique
   */
  export type RefreshTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findUniqueOrThrow
   */
  export type RefreshTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findFirst
   */
  export type RefreshTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findFirstOrThrow
   */
  export type RefreshTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findMany
   */
  export type RefreshTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken create
   */
  export type RefreshTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a RefreshToken.
     */
    data: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
  }

  /**
   * RefreshToken createMany
   */
  export type RefreshTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefreshToken createManyAndReturn
   */
  export type RefreshTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken update
   */
  export type RefreshTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a RefreshToken.
     */
    data: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
    /**
     * Choose, which RefreshToken to update.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken updateMany
   */
  export type RefreshTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
  }

  /**
   * RefreshToken upsert
   */
  export type RefreshTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the RefreshToken to update in case it exists.
     */
    where: RefreshTokenWhereUniqueInput
    /**
     * In case the RefreshToken found by the `where` argument doesn't exist, create a new RefreshToken with this data.
     */
    create: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
    /**
     * In case the RefreshToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
  }

  /**
   * RefreshToken delete
   */
  export type RefreshTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter which RefreshToken to delete.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken deleteMany
   */
  export type RefreshTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshTokens to delete
     */
    where?: RefreshTokenWhereInput
  }

  /**
   * RefreshToken without action
   */
  export type RefreshTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
  }


  /**
   * Model Invoice
   */

  export type AggregateInvoice = {
    _count: InvoiceCountAggregateOutputType | null
    _avg: InvoiceAvgAggregateOutputType | null
    _sum: InvoiceSumAggregateOutputType | null
    _min: InvoiceMinAggregateOutputType | null
    _max: InvoiceMaxAggregateOutputType | null
  }

  export type InvoiceAvgAggregateOutputType = {
    globalDiscount: number | null
    stampDuty: number | null
    ircRate: number | null
    ircAmount: number | null
    totalHT: number | null
    totalTVA: number | null
    totalTTC: number | null
  }

  export type InvoiceSumAggregateOutputType = {
    globalDiscount: number | null
    stampDuty: number | null
    ircRate: number | null
    ircAmount: number | null
    totalHT: number | null
    totalTVA: number | null
    totalTTC: number | null
  }

  export type InvoiceMinAggregateOutputType = {
    id: string | null
    documentType: string | null
    documentNumber: string | null
    invoiceDate: Date | null
    dueDate: Date | null
    deliveryDate: Date | null
    dispatchDate: Date | null
    paymentDate: Date | null
    signatureDate: string | null
    otherDate: Date | null
    periodStart: Date | null
    periodEnd: Date | null
    operationNature: string | null
    currency: string | null
    orderReference: string | null
    contractReference: string | null
    deliveryNoteReference: string | null
    userId: string | null
    supplierId: string | null
    buyerId: string | null
    globalDiscount: number | null
    stampDuty: number | null
    ttnReference: string | null
    paymentMeans: string | null
    bankName: string | null
    bankCode: string | null
    bankRib: string | null
    bankAccountOwner: string | null
    checkNumber: string | null
    cardType: string | null
    cardLast4: string | null
    cardReference: string | null
    postalAccountNumber: string | null
    postalAccountOwner: string | null
    postalBranchCode: string | null
    postalServiceName: string | null
    ePaymentGateway: string | null
    ePaymentTransactionId: string | null
    otherPaymentDescription: string | null
    otherPaymentReference: string | null
    ircRate: number | null
    ircAmount: number | null
    ircExemptionReason: string | null
    qrCodeEnabled: boolean | null
    qrCodeContent: string | null
    amountDescriptionOverride: string | null
    amountLanguage: string | null
    xmlContent: string | null
    status: string | null
    totalHT: number | null
    totalTVA: number | null
    totalTTC: number | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvoiceMaxAggregateOutputType = {
    id: string | null
    documentType: string | null
    documentNumber: string | null
    invoiceDate: Date | null
    dueDate: Date | null
    deliveryDate: Date | null
    dispatchDate: Date | null
    paymentDate: Date | null
    signatureDate: string | null
    otherDate: Date | null
    periodStart: Date | null
    periodEnd: Date | null
    operationNature: string | null
    currency: string | null
    orderReference: string | null
    contractReference: string | null
    deliveryNoteReference: string | null
    userId: string | null
    supplierId: string | null
    buyerId: string | null
    globalDiscount: number | null
    stampDuty: number | null
    ttnReference: string | null
    paymentMeans: string | null
    bankName: string | null
    bankCode: string | null
    bankRib: string | null
    bankAccountOwner: string | null
    checkNumber: string | null
    cardType: string | null
    cardLast4: string | null
    cardReference: string | null
    postalAccountNumber: string | null
    postalAccountOwner: string | null
    postalBranchCode: string | null
    postalServiceName: string | null
    ePaymentGateway: string | null
    ePaymentTransactionId: string | null
    otherPaymentDescription: string | null
    otherPaymentReference: string | null
    ircRate: number | null
    ircAmount: number | null
    ircExemptionReason: string | null
    qrCodeEnabled: boolean | null
    qrCodeContent: string | null
    amountDescriptionOverride: string | null
    amountLanguage: string | null
    xmlContent: string | null
    status: string | null
    totalHT: number | null
    totalTVA: number | null
    totalTTC: number | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvoiceCountAggregateOutputType = {
    id: number
    documentType: number
    documentNumber: number
    invoiceDate: number
    dueDate: number
    deliveryDate: number
    dispatchDate: number
    paymentDate: number
    signatureDate: number
    otherDate: number
    periodStart: number
    periodEnd: number
    operationNature: number
    currency: number
    orderReference: number
    contractReference: number
    deliveryNoteReference: number
    userId: number
    supplierId: number
    buyerId: number
    globalDiscount: number
    stampDuty: number
    ttnReference: number
    paymentMeans: number
    bankName: number
    bankCode: number
    bankRib: number
    bankAccountOwner: number
    checkNumber: number
    cardType: number
    cardLast4: number
    cardReference: number
    postalAccountNumber: number
    postalAccountOwner: number
    postalBranchCode: number
    postalServiceName: number
    ePaymentGateway: number
    ePaymentTransactionId: number
    otherPaymentDescription: number
    otherPaymentReference: number
    ircRate: number
    ircAmount: number
    ircExemptionReason: number
    qrCodeEnabled: number
    qrCodeContent: number
    amountDescriptionOverride: number
    amountLanguage: number
    xmlContent: number
    status: number
    totalHT: number
    totalTVA: number
    totalTTC: number
    deletedAt: number
    metadata: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InvoiceAvgAggregateInputType = {
    globalDiscount?: true
    stampDuty?: true
    ircRate?: true
    ircAmount?: true
    totalHT?: true
    totalTVA?: true
    totalTTC?: true
  }

  export type InvoiceSumAggregateInputType = {
    globalDiscount?: true
    stampDuty?: true
    ircRate?: true
    ircAmount?: true
    totalHT?: true
    totalTVA?: true
    totalTTC?: true
  }

  export type InvoiceMinAggregateInputType = {
    id?: true
    documentType?: true
    documentNumber?: true
    invoiceDate?: true
    dueDate?: true
    deliveryDate?: true
    dispatchDate?: true
    paymentDate?: true
    signatureDate?: true
    otherDate?: true
    periodStart?: true
    periodEnd?: true
    operationNature?: true
    currency?: true
    orderReference?: true
    contractReference?: true
    deliveryNoteReference?: true
    userId?: true
    supplierId?: true
    buyerId?: true
    globalDiscount?: true
    stampDuty?: true
    ttnReference?: true
    paymentMeans?: true
    bankName?: true
    bankCode?: true
    bankRib?: true
    bankAccountOwner?: true
    checkNumber?: true
    cardType?: true
    cardLast4?: true
    cardReference?: true
    postalAccountNumber?: true
    postalAccountOwner?: true
    postalBranchCode?: true
    postalServiceName?: true
    ePaymentGateway?: true
    ePaymentTransactionId?: true
    otherPaymentDescription?: true
    otherPaymentReference?: true
    ircRate?: true
    ircAmount?: true
    ircExemptionReason?: true
    qrCodeEnabled?: true
    qrCodeContent?: true
    amountDescriptionOverride?: true
    amountLanguage?: true
    xmlContent?: true
    status?: true
    totalHT?: true
    totalTVA?: true
    totalTTC?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvoiceMaxAggregateInputType = {
    id?: true
    documentType?: true
    documentNumber?: true
    invoiceDate?: true
    dueDate?: true
    deliveryDate?: true
    dispatchDate?: true
    paymentDate?: true
    signatureDate?: true
    otherDate?: true
    periodStart?: true
    periodEnd?: true
    operationNature?: true
    currency?: true
    orderReference?: true
    contractReference?: true
    deliveryNoteReference?: true
    userId?: true
    supplierId?: true
    buyerId?: true
    globalDiscount?: true
    stampDuty?: true
    ttnReference?: true
    paymentMeans?: true
    bankName?: true
    bankCode?: true
    bankRib?: true
    bankAccountOwner?: true
    checkNumber?: true
    cardType?: true
    cardLast4?: true
    cardReference?: true
    postalAccountNumber?: true
    postalAccountOwner?: true
    postalBranchCode?: true
    postalServiceName?: true
    ePaymentGateway?: true
    ePaymentTransactionId?: true
    otherPaymentDescription?: true
    otherPaymentReference?: true
    ircRate?: true
    ircAmount?: true
    ircExemptionReason?: true
    qrCodeEnabled?: true
    qrCodeContent?: true
    amountDescriptionOverride?: true
    amountLanguage?: true
    xmlContent?: true
    status?: true
    totalHT?: true
    totalTVA?: true
    totalTTC?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvoiceCountAggregateInputType = {
    id?: true
    documentType?: true
    documentNumber?: true
    invoiceDate?: true
    dueDate?: true
    deliveryDate?: true
    dispatchDate?: true
    paymentDate?: true
    signatureDate?: true
    otherDate?: true
    periodStart?: true
    periodEnd?: true
    operationNature?: true
    currency?: true
    orderReference?: true
    contractReference?: true
    deliveryNoteReference?: true
    userId?: true
    supplierId?: true
    buyerId?: true
    globalDiscount?: true
    stampDuty?: true
    ttnReference?: true
    paymentMeans?: true
    bankName?: true
    bankCode?: true
    bankRib?: true
    bankAccountOwner?: true
    checkNumber?: true
    cardType?: true
    cardLast4?: true
    cardReference?: true
    postalAccountNumber?: true
    postalAccountOwner?: true
    postalBranchCode?: true
    postalServiceName?: true
    ePaymentGateway?: true
    ePaymentTransactionId?: true
    otherPaymentDescription?: true
    otherPaymentReference?: true
    ircRate?: true
    ircAmount?: true
    ircExemptionReason?: true
    qrCodeEnabled?: true
    qrCodeContent?: true
    amountDescriptionOverride?: true
    amountLanguage?: true
    xmlContent?: true
    status?: true
    totalHT?: true
    totalTVA?: true
    totalTTC?: true
    deletedAt?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InvoiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invoice to aggregate.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Invoices
    **/
    _count?: true | InvoiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvoiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvoiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvoiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvoiceMaxAggregateInputType
  }

  export type GetInvoiceAggregateType<T extends InvoiceAggregateArgs> = {
        [P in keyof T & keyof AggregateInvoice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvoice[P]>
      : GetScalarType<T[P], AggregateInvoice[P]>
  }




  export type InvoiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceWhereInput
    orderBy?: InvoiceOrderByWithAggregationInput | InvoiceOrderByWithAggregationInput[]
    by: InvoiceScalarFieldEnum[] | InvoiceScalarFieldEnum
    having?: InvoiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvoiceCountAggregateInputType | true
    _avg?: InvoiceAvgAggregateInputType
    _sum?: InvoiceSumAggregateInputType
    _min?: InvoiceMinAggregateInputType
    _max?: InvoiceMaxAggregateInputType
  }

  export type InvoiceGroupByOutputType = {
    id: string
    documentType: string
    documentNumber: string
    invoiceDate: Date
    dueDate: Date | null
    deliveryDate: Date | null
    dispatchDate: Date | null
    paymentDate: Date | null
    signatureDate: string | null
    otherDate: Date | null
    periodStart: Date | null
    periodEnd: Date | null
    operationNature: string
    currency: string
    orderReference: string | null
    contractReference: string | null
    deliveryNoteReference: string | null
    userId: string
    supplierId: string
    buyerId: string
    globalDiscount: number
    stampDuty: number
    ttnReference: string | null
    paymentMeans: string
    bankName: string | null
    bankCode: string | null
    bankRib: string | null
    bankAccountOwner: string | null
    checkNumber: string | null
    cardType: string | null
    cardLast4: string | null
    cardReference: string | null
    postalAccountNumber: string | null
    postalAccountOwner: string | null
    postalBranchCode: string | null
    postalServiceName: string | null
    ePaymentGateway: string | null
    ePaymentTransactionId: string | null
    otherPaymentDescription: string | null
    otherPaymentReference: string | null
    ircRate: number | null
    ircAmount: number | null
    ircExemptionReason: string | null
    qrCodeEnabled: boolean
    qrCodeContent: string | null
    amountDescriptionOverride: string | null
    amountLanguage: string
    xmlContent: string
    status: string
    totalHT: number
    totalTVA: number
    totalTTC: number
    deletedAt: Date | null
    metadata: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: InvoiceCountAggregateOutputType | null
    _avg: InvoiceAvgAggregateOutputType | null
    _sum: InvoiceSumAggregateOutputType | null
    _min: InvoiceMinAggregateOutputType | null
    _max: InvoiceMaxAggregateOutputType | null
  }

  type GetInvoiceGroupByPayload<T extends InvoiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvoiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvoiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvoiceGroupByOutputType[P]>
            : GetScalarType<T[P], InvoiceGroupByOutputType[P]>
        }
      >
    >


  export type InvoiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentType?: boolean
    documentNumber?: boolean
    invoiceDate?: boolean
    dueDate?: boolean
    deliveryDate?: boolean
    dispatchDate?: boolean
    paymentDate?: boolean
    signatureDate?: boolean
    otherDate?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    operationNature?: boolean
    currency?: boolean
    orderReference?: boolean
    contractReference?: boolean
    deliveryNoteReference?: boolean
    userId?: boolean
    supplierId?: boolean
    buyerId?: boolean
    globalDiscount?: boolean
    stampDuty?: boolean
    ttnReference?: boolean
    paymentMeans?: boolean
    bankName?: boolean
    bankCode?: boolean
    bankRib?: boolean
    bankAccountOwner?: boolean
    checkNumber?: boolean
    cardType?: boolean
    cardLast4?: boolean
    cardReference?: boolean
    postalAccountNumber?: boolean
    postalAccountOwner?: boolean
    postalBranchCode?: boolean
    postalServiceName?: boolean
    ePaymentGateway?: boolean
    ePaymentTransactionId?: boolean
    otherPaymentDescription?: boolean
    otherPaymentReference?: boolean
    ircRate?: boolean
    ircAmount?: boolean
    ircExemptionReason?: boolean
    qrCodeEnabled?: boolean
    qrCodeContent?: boolean
    amountDescriptionOverride?: boolean
    amountLanguage?: boolean
    xmlContent?: boolean
    status?: boolean
    totalHT?: boolean
    totalTVA?: boolean
    totalTTC?: boolean
    deletedAt?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    supplier?: boolean | PartnerDefaultArgs<ExtArgs>
    buyer?: boolean | PartnerDefaultArgs<ExtArgs>
    lines?: boolean | Invoice$linesArgs<ExtArgs>
    allowances?: boolean | Invoice$allowancesArgs<ExtArgs>
    _count?: boolean | InvoiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoice"]>

  export type InvoiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentType?: boolean
    documentNumber?: boolean
    invoiceDate?: boolean
    dueDate?: boolean
    deliveryDate?: boolean
    dispatchDate?: boolean
    paymentDate?: boolean
    signatureDate?: boolean
    otherDate?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    operationNature?: boolean
    currency?: boolean
    orderReference?: boolean
    contractReference?: boolean
    deliveryNoteReference?: boolean
    userId?: boolean
    supplierId?: boolean
    buyerId?: boolean
    globalDiscount?: boolean
    stampDuty?: boolean
    ttnReference?: boolean
    paymentMeans?: boolean
    bankName?: boolean
    bankCode?: boolean
    bankRib?: boolean
    bankAccountOwner?: boolean
    checkNumber?: boolean
    cardType?: boolean
    cardLast4?: boolean
    cardReference?: boolean
    postalAccountNumber?: boolean
    postalAccountOwner?: boolean
    postalBranchCode?: boolean
    postalServiceName?: boolean
    ePaymentGateway?: boolean
    ePaymentTransactionId?: boolean
    otherPaymentDescription?: boolean
    otherPaymentReference?: boolean
    ircRate?: boolean
    ircAmount?: boolean
    ircExemptionReason?: boolean
    qrCodeEnabled?: boolean
    qrCodeContent?: boolean
    amountDescriptionOverride?: boolean
    amountLanguage?: boolean
    xmlContent?: boolean
    status?: boolean
    totalHT?: boolean
    totalTVA?: boolean
    totalTTC?: boolean
    deletedAt?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    supplier?: boolean | PartnerDefaultArgs<ExtArgs>
    buyer?: boolean | PartnerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoice"]>

  export type InvoiceSelectScalar = {
    id?: boolean
    documentType?: boolean
    documentNumber?: boolean
    invoiceDate?: boolean
    dueDate?: boolean
    deliveryDate?: boolean
    dispatchDate?: boolean
    paymentDate?: boolean
    signatureDate?: boolean
    otherDate?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    operationNature?: boolean
    currency?: boolean
    orderReference?: boolean
    contractReference?: boolean
    deliveryNoteReference?: boolean
    userId?: boolean
    supplierId?: boolean
    buyerId?: boolean
    globalDiscount?: boolean
    stampDuty?: boolean
    ttnReference?: boolean
    paymentMeans?: boolean
    bankName?: boolean
    bankCode?: boolean
    bankRib?: boolean
    bankAccountOwner?: boolean
    checkNumber?: boolean
    cardType?: boolean
    cardLast4?: boolean
    cardReference?: boolean
    postalAccountNumber?: boolean
    postalAccountOwner?: boolean
    postalBranchCode?: boolean
    postalServiceName?: boolean
    ePaymentGateway?: boolean
    ePaymentTransactionId?: boolean
    otherPaymentDescription?: boolean
    otherPaymentReference?: boolean
    ircRate?: boolean
    ircAmount?: boolean
    ircExemptionReason?: boolean
    qrCodeEnabled?: boolean
    qrCodeContent?: boolean
    amountDescriptionOverride?: boolean
    amountLanguage?: boolean
    xmlContent?: boolean
    status?: boolean
    totalHT?: boolean
    totalTVA?: boolean
    totalTTC?: boolean
    deletedAt?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InvoiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    supplier?: boolean | PartnerDefaultArgs<ExtArgs>
    buyer?: boolean | PartnerDefaultArgs<ExtArgs>
    lines?: boolean | Invoice$linesArgs<ExtArgs>
    allowances?: boolean | Invoice$allowancesArgs<ExtArgs>
    _count?: boolean | InvoiceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type InvoiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    supplier?: boolean | PartnerDefaultArgs<ExtArgs>
    buyer?: boolean | PartnerDefaultArgs<ExtArgs>
  }

  export type $InvoicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Invoice"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      supplier: Prisma.$PartnerPayload<ExtArgs>
      buyer: Prisma.$PartnerPayload<ExtArgs>
      lines: Prisma.$InvoiceLinePayload<ExtArgs>[]
      allowances: Prisma.$AllowanceChargePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      documentType: string
      documentNumber: string
      invoiceDate: Date
      dueDate: Date | null
      deliveryDate: Date | null
      dispatchDate: Date | null
      paymentDate: Date | null
      signatureDate: string | null
      otherDate: Date | null
      periodStart: Date | null
      periodEnd: Date | null
      operationNature: string
      currency: string
      orderReference: string | null
      contractReference: string | null
      deliveryNoteReference: string | null
      userId: string
      supplierId: string
      buyerId: string
      globalDiscount: number
      stampDuty: number
      ttnReference: string | null
      paymentMeans: string
      bankName: string | null
      bankCode: string | null
      bankRib: string | null
      bankAccountOwner: string | null
      checkNumber: string | null
      cardType: string | null
      cardLast4: string | null
      cardReference: string | null
      postalAccountNumber: string | null
      postalAccountOwner: string | null
      postalBranchCode: string | null
      postalServiceName: string | null
      ePaymentGateway: string | null
      ePaymentTransactionId: string | null
      otherPaymentDescription: string | null
      otherPaymentReference: string | null
      ircRate: number | null
      ircAmount: number | null
      ircExemptionReason: string | null
      qrCodeEnabled: boolean
      qrCodeContent: string | null
      amountDescriptionOverride: string | null
      amountLanguage: string
      xmlContent: string
      status: string
      totalHT: number
      totalTVA: number
      totalTTC: number
      deletedAt: Date | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["invoice"]>
    composites: {}
  }

  type InvoiceGetPayload<S extends boolean | null | undefined | InvoiceDefaultArgs> = $Result.GetResult<Prisma.$InvoicePayload, S>

  type InvoiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InvoiceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InvoiceCountAggregateInputType | true
    }

  export interface InvoiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Invoice'], meta: { name: 'Invoice' } }
    /**
     * Find zero or one Invoice that matches the filter.
     * @param {InvoiceFindUniqueArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvoiceFindUniqueArgs>(args: SelectSubset<T, InvoiceFindUniqueArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Invoice that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InvoiceFindUniqueOrThrowArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvoiceFindUniqueOrThrowArgs>(args: SelectSubset<T, InvoiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Invoice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindFirstArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvoiceFindFirstArgs>(args?: SelectSubset<T, InvoiceFindFirstArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Invoice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindFirstOrThrowArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvoiceFindFirstOrThrowArgs>(args?: SelectSubset<T, InvoiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Invoices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Invoices
     * const invoices = await prisma.invoice.findMany()
     * 
     * // Get first 10 Invoices
     * const invoices = await prisma.invoice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invoiceWithIdOnly = await prisma.invoice.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvoiceFindManyArgs>(args?: SelectSubset<T, InvoiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Invoice.
     * @param {InvoiceCreateArgs} args - Arguments to create a Invoice.
     * @example
     * // Create one Invoice
     * const Invoice = await prisma.invoice.create({
     *   data: {
     *     // ... data to create a Invoice
     *   }
     * })
     * 
     */
    create<T extends InvoiceCreateArgs>(args: SelectSubset<T, InvoiceCreateArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Invoices.
     * @param {InvoiceCreateManyArgs} args - Arguments to create many Invoices.
     * @example
     * // Create many Invoices
     * const invoice = await prisma.invoice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvoiceCreateManyArgs>(args?: SelectSubset<T, InvoiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Invoices and returns the data saved in the database.
     * @param {InvoiceCreateManyAndReturnArgs} args - Arguments to create many Invoices.
     * @example
     * // Create many Invoices
     * const invoice = await prisma.invoice.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Invoices and only return the `id`
     * const invoiceWithIdOnly = await prisma.invoice.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InvoiceCreateManyAndReturnArgs>(args?: SelectSubset<T, InvoiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Invoice.
     * @param {InvoiceDeleteArgs} args - Arguments to delete one Invoice.
     * @example
     * // Delete one Invoice
     * const Invoice = await prisma.invoice.delete({
     *   where: {
     *     // ... filter to delete one Invoice
     *   }
     * })
     * 
     */
    delete<T extends InvoiceDeleteArgs>(args: SelectSubset<T, InvoiceDeleteArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Invoice.
     * @param {InvoiceUpdateArgs} args - Arguments to update one Invoice.
     * @example
     * // Update one Invoice
     * const invoice = await prisma.invoice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvoiceUpdateArgs>(args: SelectSubset<T, InvoiceUpdateArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Invoices.
     * @param {InvoiceDeleteManyArgs} args - Arguments to filter Invoices to delete.
     * @example
     * // Delete a few Invoices
     * const { count } = await prisma.invoice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvoiceDeleteManyArgs>(args?: SelectSubset<T, InvoiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Invoices
     * const invoice = await prisma.invoice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvoiceUpdateManyArgs>(args: SelectSubset<T, InvoiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Invoice.
     * @param {InvoiceUpsertArgs} args - Arguments to update or create a Invoice.
     * @example
     * // Update or create a Invoice
     * const invoice = await prisma.invoice.upsert({
     *   create: {
     *     // ... data to create a Invoice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Invoice we want to update
     *   }
     * })
     */
    upsert<T extends InvoiceUpsertArgs>(args: SelectSubset<T, InvoiceUpsertArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Invoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceCountArgs} args - Arguments to filter Invoices to count.
     * @example
     * // Count the number of Invoices
     * const count = await prisma.invoice.count({
     *   where: {
     *     // ... the filter for the Invoices we want to count
     *   }
     * })
    **/
    count<T extends InvoiceCountArgs>(
      args?: Subset<T, InvoiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvoiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Invoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvoiceAggregateArgs>(args: Subset<T, InvoiceAggregateArgs>): Prisma.PrismaPromise<GetInvoiceAggregateType<T>>

    /**
     * Group by Invoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvoiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvoiceGroupByArgs['orderBy'] }
        : { orderBy?: InvoiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvoiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvoiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Invoice model
   */
  readonly fields: InvoiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Invoice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvoiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    supplier<T extends PartnerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PartnerDefaultArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    buyer<T extends PartnerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PartnerDefaultArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    lines<T extends Invoice$linesArgs<ExtArgs> = {}>(args?: Subset<T, Invoice$linesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoiceLinePayload<ExtArgs>, T, "findMany"> | Null>
    allowances<T extends Invoice$allowancesArgs<ExtArgs> = {}>(args?: Subset<T, Invoice$allowancesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AllowanceChargePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Invoice model
   */ 
  interface InvoiceFieldRefs {
    readonly id: FieldRef<"Invoice", 'String'>
    readonly documentType: FieldRef<"Invoice", 'String'>
    readonly documentNumber: FieldRef<"Invoice", 'String'>
    readonly invoiceDate: FieldRef<"Invoice", 'DateTime'>
    readonly dueDate: FieldRef<"Invoice", 'DateTime'>
    readonly deliveryDate: FieldRef<"Invoice", 'DateTime'>
    readonly dispatchDate: FieldRef<"Invoice", 'DateTime'>
    readonly paymentDate: FieldRef<"Invoice", 'DateTime'>
    readonly signatureDate: FieldRef<"Invoice", 'String'>
    readonly otherDate: FieldRef<"Invoice", 'DateTime'>
    readonly periodStart: FieldRef<"Invoice", 'DateTime'>
    readonly periodEnd: FieldRef<"Invoice", 'DateTime'>
    readonly operationNature: FieldRef<"Invoice", 'String'>
    readonly currency: FieldRef<"Invoice", 'String'>
    readonly orderReference: FieldRef<"Invoice", 'String'>
    readonly contractReference: FieldRef<"Invoice", 'String'>
    readonly deliveryNoteReference: FieldRef<"Invoice", 'String'>
    readonly userId: FieldRef<"Invoice", 'String'>
    readonly supplierId: FieldRef<"Invoice", 'String'>
    readonly buyerId: FieldRef<"Invoice", 'String'>
    readonly globalDiscount: FieldRef<"Invoice", 'Float'>
    readonly stampDuty: FieldRef<"Invoice", 'Float'>
    readonly ttnReference: FieldRef<"Invoice", 'String'>
    readonly paymentMeans: FieldRef<"Invoice", 'String'>
    readonly bankName: FieldRef<"Invoice", 'String'>
    readonly bankCode: FieldRef<"Invoice", 'String'>
    readonly bankRib: FieldRef<"Invoice", 'String'>
    readonly bankAccountOwner: FieldRef<"Invoice", 'String'>
    readonly checkNumber: FieldRef<"Invoice", 'String'>
    readonly cardType: FieldRef<"Invoice", 'String'>
    readonly cardLast4: FieldRef<"Invoice", 'String'>
    readonly cardReference: FieldRef<"Invoice", 'String'>
    readonly postalAccountNumber: FieldRef<"Invoice", 'String'>
    readonly postalAccountOwner: FieldRef<"Invoice", 'String'>
    readonly postalBranchCode: FieldRef<"Invoice", 'String'>
    readonly postalServiceName: FieldRef<"Invoice", 'String'>
    readonly ePaymentGateway: FieldRef<"Invoice", 'String'>
    readonly ePaymentTransactionId: FieldRef<"Invoice", 'String'>
    readonly otherPaymentDescription: FieldRef<"Invoice", 'String'>
    readonly otherPaymentReference: FieldRef<"Invoice", 'String'>
    readonly ircRate: FieldRef<"Invoice", 'Float'>
    readonly ircAmount: FieldRef<"Invoice", 'Float'>
    readonly ircExemptionReason: FieldRef<"Invoice", 'String'>
    readonly qrCodeEnabled: FieldRef<"Invoice", 'Boolean'>
    readonly qrCodeContent: FieldRef<"Invoice", 'String'>
    readonly amountDescriptionOverride: FieldRef<"Invoice", 'String'>
    readonly amountLanguage: FieldRef<"Invoice", 'String'>
    readonly xmlContent: FieldRef<"Invoice", 'String'>
    readonly status: FieldRef<"Invoice", 'String'>
    readonly totalHT: FieldRef<"Invoice", 'Float'>
    readonly totalTVA: FieldRef<"Invoice", 'Float'>
    readonly totalTTC: FieldRef<"Invoice", 'Float'>
    readonly deletedAt: FieldRef<"Invoice", 'DateTime'>
    readonly metadata: FieldRef<"Invoice", 'Json'>
    readonly createdAt: FieldRef<"Invoice", 'DateTime'>
    readonly updatedAt: FieldRef<"Invoice", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Invoice findUnique
   */
  export type InvoiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice findUniqueOrThrow
   */
  export type InvoiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice findFirst
   */
  export type InvoiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invoices.
     */
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice findFirstOrThrow
   */
  export type InvoiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invoices.
     */
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice findMany
   */
  export type InvoiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoices to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice create
   */
  export type InvoiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Invoice.
     */
    data: XOR<InvoiceCreateInput, InvoiceUncheckedCreateInput>
  }

  /**
   * Invoice createMany
   */
  export type InvoiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Invoices.
     */
    data: InvoiceCreateManyInput | InvoiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Invoice createManyAndReturn
   */
  export type InvoiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Invoices.
     */
    data: InvoiceCreateManyInput | InvoiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Invoice update
   */
  export type InvoiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Invoice.
     */
    data: XOR<InvoiceUpdateInput, InvoiceUncheckedUpdateInput>
    /**
     * Choose, which Invoice to update.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice updateMany
   */
  export type InvoiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Invoices.
     */
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyInput>
    /**
     * Filter which Invoices to update
     */
    where?: InvoiceWhereInput
  }

  /**
   * Invoice upsert
   */
  export type InvoiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Invoice to update in case it exists.
     */
    where: InvoiceWhereUniqueInput
    /**
     * In case the Invoice found by the `where` argument doesn't exist, create a new Invoice with this data.
     */
    create: XOR<InvoiceCreateInput, InvoiceUncheckedCreateInput>
    /**
     * In case the Invoice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvoiceUpdateInput, InvoiceUncheckedUpdateInput>
  }

  /**
   * Invoice delete
   */
  export type InvoiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter which Invoice to delete.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice deleteMany
   */
  export type InvoiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invoices to delete
     */
    where?: InvoiceWhereInput
  }

  /**
   * Invoice.lines
   */
  export type Invoice$linesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceLine
     */
    select?: InvoiceLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceLineInclude<ExtArgs> | null
    where?: InvoiceLineWhereInput
    orderBy?: InvoiceLineOrderByWithRelationInput | InvoiceLineOrderByWithRelationInput[]
    cursor?: InvoiceLineWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvoiceLineScalarFieldEnum | InvoiceLineScalarFieldEnum[]
  }

  /**
   * Invoice.allowances
   */
  export type Invoice$allowancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllowanceCharge
     */
    select?: AllowanceChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllowanceChargeInclude<ExtArgs> | null
    where?: AllowanceChargeWhereInput
    orderBy?: AllowanceChargeOrderByWithRelationInput | AllowanceChargeOrderByWithRelationInput[]
    cursor?: AllowanceChargeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AllowanceChargeScalarFieldEnum | AllowanceChargeScalarFieldEnum[]
  }

  /**
   * Invoice without action
   */
  export type InvoiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
  }


  /**
   * Model Partner
   */

  export type AggregatePartner = {
    _count: PartnerCountAggregateOutputType | null
    _min: PartnerMinAggregateOutputType | null
    _max: PartnerMaxAggregateOutputType | null
  }

  export type PartnerMinAggregateOutputType = {
    id: string | null
    idType: string | null
    idValue: string | null
    name: string | null
    addressDescription: string | null
    street: string | null
    city: string | null
    postalCode: string | null
    country: string | null
    rc: string | null
    capital: string | null
    phone: string | null
    email: string | null
    partnerType: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PartnerMaxAggregateOutputType = {
    id: string | null
    idType: string | null
    idValue: string | null
    name: string | null
    addressDescription: string | null
    street: string | null
    city: string | null
    postalCode: string | null
    country: string | null
    rc: string | null
    capital: string | null
    phone: string | null
    email: string | null
    partnerType: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PartnerCountAggregateOutputType = {
    id: number
    idType: number
    idValue: number
    name: number
    addressDescription: number
    street: number
    city: number
    postalCode: number
    country: number
    rc: number
    capital: number
    phone: number
    email: number
    partnerType: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PartnerMinAggregateInputType = {
    id?: true
    idType?: true
    idValue?: true
    name?: true
    addressDescription?: true
    street?: true
    city?: true
    postalCode?: true
    country?: true
    rc?: true
    capital?: true
    phone?: true
    email?: true
    partnerType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PartnerMaxAggregateInputType = {
    id?: true
    idType?: true
    idValue?: true
    name?: true
    addressDescription?: true
    street?: true
    city?: true
    postalCode?: true
    country?: true
    rc?: true
    capital?: true
    phone?: true
    email?: true
    partnerType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PartnerCountAggregateInputType = {
    id?: true
    idType?: true
    idValue?: true
    name?: true
    addressDescription?: true
    street?: true
    city?: true
    postalCode?: true
    country?: true
    rc?: true
    capital?: true
    phone?: true
    email?: true
    partnerType?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PartnerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Partner to aggregate.
     */
    where?: PartnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Partners to fetch.
     */
    orderBy?: PartnerOrderByWithRelationInput | PartnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PartnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Partners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Partners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Partners
    **/
    _count?: true | PartnerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PartnerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PartnerMaxAggregateInputType
  }

  export type GetPartnerAggregateType<T extends PartnerAggregateArgs> = {
        [P in keyof T & keyof AggregatePartner]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePartner[P]>
      : GetScalarType<T[P], AggregatePartner[P]>
  }




  export type PartnerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PartnerWhereInput
    orderBy?: PartnerOrderByWithAggregationInput | PartnerOrderByWithAggregationInput[]
    by: PartnerScalarFieldEnum[] | PartnerScalarFieldEnum
    having?: PartnerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PartnerCountAggregateInputType | true
    _min?: PartnerMinAggregateInputType
    _max?: PartnerMaxAggregateInputType
  }

  export type PartnerGroupByOutputType = {
    id: string
    idType: string
    idValue: string
    name: string
    addressDescription: string | null
    street: string
    city: string
    postalCode: string
    country: string
    rc: string | null
    capital: string | null
    phone: string | null
    email: string | null
    partnerType: string | null
    createdAt: Date
    updatedAt: Date
    _count: PartnerCountAggregateOutputType | null
    _min: PartnerMinAggregateOutputType | null
    _max: PartnerMaxAggregateOutputType | null
  }

  type GetPartnerGroupByPayload<T extends PartnerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PartnerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PartnerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PartnerGroupByOutputType[P]>
            : GetScalarType<T[P], PartnerGroupByOutputType[P]>
        }
      >
    >


  export type PartnerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idType?: boolean
    idValue?: boolean
    name?: boolean
    addressDescription?: boolean
    street?: boolean
    city?: boolean
    postalCode?: boolean
    country?: boolean
    rc?: boolean
    capital?: boolean
    phone?: boolean
    email?: boolean
    partnerType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    supplierInvoices?: boolean | Partner$supplierInvoicesArgs<ExtArgs>
    buyerInvoices?: boolean | Partner$buyerInvoicesArgs<ExtArgs>
    _count?: boolean | PartnerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["partner"]>

  export type PartnerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idType?: boolean
    idValue?: boolean
    name?: boolean
    addressDescription?: boolean
    street?: boolean
    city?: boolean
    postalCode?: boolean
    country?: boolean
    rc?: boolean
    capital?: boolean
    phone?: boolean
    email?: boolean
    partnerType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["partner"]>

  export type PartnerSelectScalar = {
    id?: boolean
    idType?: boolean
    idValue?: boolean
    name?: boolean
    addressDescription?: boolean
    street?: boolean
    city?: boolean
    postalCode?: boolean
    country?: boolean
    rc?: boolean
    capital?: boolean
    phone?: boolean
    email?: boolean
    partnerType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PartnerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    supplierInvoices?: boolean | Partner$supplierInvoicesArgs<ExtArgs>
    buyerInvoices?: boolean | Partner$buyerInvoicesArgs<ExtArgs>
    _count?: boolean | PartnerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PartnerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PartnerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Partner"
    objects: {
      supplierInvoices: Prisma.$InvoicePayload<ExtArgs>[]
      buyerInvoices: Prisma.$InvoicePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      idType: string
      idValue: string
      name: string
      addressDescription: string | null
      street: string
      city: string
      postalCode: string
      country: string
      rc: string | null
      capital: string | null
      phone: string | null
      email: string | null
      partnerType: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["partner"]>
    composites: {}
  }

  type PartnerGetPayload<S extends boolean | null | undefined | PartnerDefaultArgs> = $Result.GetResult<Prisma.$PartnerPayload, S>

  type PartnerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PartnerFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PartnerCountAggregateInputType | true
    }

  export interface PartnerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Partner'], meta: { name: 'Partner' } }
    /**
     * Find zero or one Partner that matches the filter.
     * @param {PartnerFindUniqueArgs} args - Arguments to find a Partner
     * @example
     * // Get one Partner
     * const partner = await prisma.partner.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PartnerFindUniqueArgs>(args: SelectSubset<T, PartnerFindUniqueArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Partner that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PartnerFindUniqueOrThrowArgs} args - Arguments to find a Partner
     * @example
     * // Get one Partner
     * const partner = await prisma.partner.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PartnerFindUniqueOrThrowArgs>(args: SelectSubset<T, PartnerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Partner that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerFindFirstArgs} args - Arguments to find a Partner
     * @example
     * // Get one Partner
     * const partner = await prisma.partner.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PartnerFindFirstArgs>(args?: SelectSubset<T, PartnerFindFirstArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Partner that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerFindFirstOrThrowArgs} args - Arguments to find a Partner
     * @example
     * // Get one Partner
     * const partner = await prisma.partner.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PartnerFindFirstOrThrowArgs>(args?: SelectSubset<T, PartnerFindFirstOrThrowArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Partners that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Partners
     * const partners = await prisma.partner.findMany()
     * 
     * // Get first 10 Partners
     * const partners = await prisma.partner.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const partnerWithIdOnly = await prisma.partner.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PartnerFindManyArgs>(args?: SelectSubset<T, PartnerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Partner.
     * @param {PartnerCreateArgs} args - Arguments to create a Partner.
     * @example
     * // Create one Partner
     * const Partner = await prisma.partner.create({
     *   data: {
     *     // ... data to create a Partner
     *   }
     * })
     * 
     */
    create<T extends PartnerCreateArgs>(args: SelectSubset<T, PartnerCreateArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Partners.
     * @param {PartnerCreateManyArgs} args - Arguments to create many Partners.
     * @example
     * // Create many Partners
     * const partner = await prisma.partner.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PartnerCreateManyArgs>(args?: SelectSubset<T, PartnerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Partners and returns the data saved in the database.
     * @param {PartnerCreateManyAndReturnArgs} args - Arguments to create many Partners.
     * @example
     * // Create many Partners
     * const partner = await prisma.partner.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Partners and only return the `id`
     * const partnerWithIdOnly = await prisma.partner.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PartnerCreateManyAndReturnArgs>(args?: SelectSubset<T, PartnerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Partner.
     * @param {PartnerDeleteArgs} args - Arguments to delete one Partner.
     * @example
     * // Delete one Partner
     * const Partner = await prisma.partner.delete({
     *   where: {
     *     // ... filter to delete one Partner
     *   }
     * })
     * 
     */
    delete<T extends PartnerDeleteArgs>(args: SelectSubset<T, PartnerDeleteArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Partner.
     * @param {PartnerUpdateArgs} args - Arguments to update one Partner.
     * @example
     * // Update one Partner
     * const partner = await prisma.partner.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PartnerUpdateArgs>(args: SelectSubset<T, PartnerUpdateArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Partners.
     * @param {PartnerDeleteManyArgs} args - Arguments to filter Partners to delete.
     * @example
     * // Delete a few Partners
     * const { count } = await prisma.partner.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PartnerDeleteManyArgs>(args?: SelectSubset<T, PartnerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Partners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Partners
     * const partner = await prisma.partner.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PartnerUpdateManyArgs>(args: SelectSubset<T, PartnerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Partner.
     * @param {PartnerUpsertArgs} args - Arguments to update or create a Partner.
     * @example
     * // Update or create a Partner
     * const partner = await prisma.partner.upsert({
     *   create: {
     *     // ... data to create a Partner
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Partner we want to update
     *   }
     * })
     */
    upsert<T extends PartnerUpsertArgs>(args: SelectSubset<T, PartnerUpsertArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Partners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerCountArgs} args - Arguments to filter Partners to count.
     * @example
     * // Count the number of Partners
     * const count = await prisma.partner.count({
     *   where: {
     *     // ... the filter for the Partners we want to count
     *   }
     * })
    **/
    count<T extends PartnerCountArgs>(
      args?: Subset<T, PartnerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PartnerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Partner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PartnerAggregateArgs>(args: Subset<T, PartnerAggregateArgs>): Prisma.PrismaPromise<GetPartnerAggregateType<T>>

    /**
     * Group by Partner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PartnerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PartnerGroupByArgs['orderBy'] }
        : { orderBy?: PartnerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PartnerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPartnerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Partner model
   */
  readonly fields: PartnerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Partner.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PartnerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    supplierInvoices<T extends Partner$supplierInvoicesArgs<ExtArgs> = {}>(args?: Subset<T, Partner$supplierInvoicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findMany"> | Null>
    buyerInvoices<T extends Partner$buyerInvoicesArgs<ExtArgs> = {}>(args?: Subset<T, Partner$buyerInvoicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Partner model
   */ 
  interface PartnerFieldRefs {
    readonly id: FieldRef<"Partner", 'String'>
    readonly idType: FieldRef<"Partner", 'String'>
    readonly idValue: FieldRef<"Partner", 'String'>
    readonly name: FieldRef<"Partner", 'String'>
    readonly addressDescription: FieldRef<"Partner", 'String'>
    readonly street: FieldRef<"Partner", 'String'>
    readonly city: FieldRef<"Partner", 'String'>
    readonly postalCode: FieldRef<"Partner", 'String'>
    readonly country: FieldRef<"Partner", 'String'>
    readonly rc: FieldRef<"Partner", 'String'>
    readonly capital: FieldRef<"Partner", 'String'>
    readonly phone: FieldRef<"Partner", 'String'>
    readonly email: FieldRef<"Partner", 'String'>
    readonly partnerType: FieldRef<"Partner", 'String'>
    readonly createdAt: FieldRef<"Partner", 'DateTime'>
    readonly updatedAt: FieldRef<"Partner", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Partner findUnique
   */
  export type PartnerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * Filter, which Partner to fetch.
     */
    where: PartnerWhereUniqueInput
  }

  /**
   * Partner findUniqueOrThrow
   */
  export type PartnerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * Filter, which Partner to fetch.
     */
    where: PartnerWhereUniqueInput
  }

  /**
   * Partner findFirst
   */
  export type PartnerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * Filter, which Partner to fetch.
     */
    where?: PartnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Partners to fetch.
     */
    orderBy?: PartnerOrderByWithRelationInput | PartnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Partners.
     */
    cursor?: PartnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Partners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Partners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Partners.
     */
    distinct?: PartnerScalarFieldEnum | PartnerScalarFieldEnum[]
  }

  /**
   * Partner findFirstOrThrow
   */
  export type PartnerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * Filter, which Partner to fetch.
     */
    where?: PartnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Partners to fetch.
     */
    orderBy?: PartnerOrderByWithRelationInput | PartnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Partners.
     */
    cursor?: PartnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Partners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Partners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Partners.
     */
    distinct?: PartnerScalarFieldEnum | PartnerScalarFieldEnum[]
  }

  /**
   * Partner findMany
   */
  export type PartnerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * Filter, which Partners to fetch.
     */
    where?: PartnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Partners to fetch.
     */
    orderBy?: PartnerOrderByWithRelationInput | PartnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Partners.
     */
    cursor?: PartnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Partners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Partners.
     */
    skip?: number
    distinct?: PartnerScalarFieldEnum | PartnerScalarFieldEnum[]
  }

  /**
   * Partner create
   */
  export type PartnerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * The data needed to create a Partner.
     */
    data: XOR<PartnerCreateInput, PartnerUncheckedCreateInput>
  }

  /**
   * Partner createMany
   */
  export type PartnerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Partners.
     */
    data: PartnerCreateManyInput | PartnerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Partner createManyAndReturn
   */
  export type PartnerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Partners.
     */
    data: PartnerCreateManyInput | PartnerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Partner update
   */
  export type PartnerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * The data needed to update a Partner.
     */
    data: XOR<PartnerUpdateInput, PartnerUncheckedUpdateInput>
    /**
     * Choose, which Partner to update.
     */
    where: PartnerWhereUniqueInput
  }

  /**
   * Partner updateMany
   */
  export type PartnerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Partners.
     */
    data: XOR<PartnerUpdateManyMutationInput, PartnerUncheckedUpdateManyInput>
    /**
     * Filter which Partners to update
     */
    where?: PartnerWhereInput
  }

  /**
   * Partner upsert
   */
  export type PartnerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * The filter to search for the Partner to update in case it exists.
     */
    where: PartnerWhereUniqueInput
    /**
     * In case the Partner found by the `where` argument doesn't exist, create a new Partner with this data.
     */
    create: XOR<PartnerCreateInput, PartnerUncheckedCreateInput>
    /**
     * In case the Partner was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PartnerUpdateInput, PartnerUncheckedUpdateInput>
  }

  /**
   * Partner delete
   */
  export type PartnerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * Filter which Partner to delete.
     */
    where: PartnerWhereUniqueInput
  }

  /**
   * Partner deleteMany
   */
  export type PartnerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Partners to delete
     */
    where?: PartnerWhereInput
  }

  /**
   * Partner.supplierInvoices
   */
  export type Partner$supplierInvoicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    where?: InvoiceWhereInput
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    cursor?: InvoiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Partner.buyerInvoices
   */
  export type Partner$buyerInvoicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    where?: InvoiceWhereInput
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    cursor?: InvoiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Partner without action
   */
  export type PartnerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
  }


  /**
   * Model InvoiceLine
   */

  export type AggregateInvoiceLine = {
    _count: InvoiceLineCountAggregateOutputType | null
    _avg: InvoiceLineAvgAggregateOutputType | null
    _sum: InvoiceLineSumAggregateOutputType | null
    _min: InvoiceLineMinAggregateOutputType | null
    _max: InvoiceLineMaxAggregateOutputType | null
  }

  export type InvoiceLineAvgAggregateOutputType = {
    quantity: number | null
    unitPrice: number | null
    discountRate: number | null
    taxRate: number | null
    lineAmount: number | null
    taxAmount: number | null
    totalAmount: number | null
  }

  export type InvoiceLineSumAggregateOutputType = {
    quantity: number | null
    unitPrice: number | null
    discountRate: number | null
    taxRate: number | null
    lineAmount: number | null
    taxAmount: number | null
    totalAmount: number | null
  }

  export type InvoiceLineMinAggregateOutputType = {
    id: string | null
    invoiceId: string | null
    itemCode: string | null
    description: string | null
    quantity: number | null
    unit: string | null
    unitPrice: number | null
    discountRate: number | null
    taxRate: number | null
    fodec: boolean | null
    exemptionReason: string | null
    lineAmount: number | null
    taxAmount: number | null
    totalAmount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvoiceLineMaxAggregateOutputType = {
    id: string | null
    invoiceId: string | null
    itemCode: string | null
    description: string | null
    quantity: number | null
    unit: string | null
    unitPrice: number | null
    discountRate: number | null
    taxRate: number | null
    fodec: boolean | null
    exemptionReason: string | null
    lineAmount: number | null
    taxAmount: number | null
    totalAmount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvoiceLineCountAggregateOutputType = {
    id: number
    invoiceId: number
    itemCode: number
    description: number
    quantity: number
    unit: number
    unitPrice: number
    discountRate: number
    taxRate: number
    fodec: number
    exemptionReason: number
    lineAmount: number
    taxAmount: number
    totalAmount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InvoiceLineAvgAggregateInputType = {
    quantity?: true
    unitPrice?: true
    discountRate?: true
    taxRate?: true
    lineAmount?: true
    taxAmount?: true
    totalAmount?: true
  }

  export type InvoiceLineSumAggregateInputType = {
    quantity?: true
    unitPrice?: true
    discountRate?: true
    taxRate?: true
    lineAmount?: true
    taxAmount?: true
    totalAmount?: true
  }

  export type InvoiceLineMinAggregateInputType = {
    id?: true
    invoiceId?: true
    itemCode?: true
    description?: true
    quantity?: true
    unit?: true
    unitPrice?: true
    discountRate?: true
    taxRate?: true
    fodec?: true
    exemptionReason?: true
    lineAmount?: true
    taxAmount?: true
    totalAmount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvoiceLineMaxAggregateInputType = {
    id?: true
    invoiceId?: true
    itemCode?: true
    description?: true
    quantity?: true
    unit?: true
    unitPrice?: true
    discountRate?: true
    taxRate?: true
    fodec?: true
    exemptionReason?: true
    lineAmount?: true
    taxAmount?: true
    totalAmount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvoiceLineCountAggregateInputType = {
    id?: true
    invoiceId?: true
    itemCode?: true
    description?: true
    quantity?: true
    unit?: true
    unitPrice?: true
    discountRate?: true
    taxRate?: true
    fodec?: true
    exemptionReason?: true
    lineAmount?: true
    taxAmount?: true
    totalAmount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InvoiceLineAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InvoiceLine to aggregate.
     */
    where?: InvoiceLineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvoiceLines to fetch.
     */
    orderBy?: InvoiceLineOrderByWithRelationInput | InvoiceLineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvoiceLineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvoiceLines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvoiceLines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InvoiceLines
    **/
    _count?: true | InvoiceLineCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvoiceLineAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvoiceLineSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvoiceLineMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvoiceLineMaxAggregateInputType
  }

  export type GetInvoiceLineAggregateType<T extends InvoiceLineAggregateArgs> = {
        [P in keyof T & keyof AggregateInvoiceLine]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvoiceLine[P]>
      : GetScalarType<T[P], AggregateInvoiceLine[P]>
  }




  export type InvoiceLineGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceLineWhereInput
    orderBy?: InvoiceLineOrderByWithAggregationInput | InvoiceLineOrderByWithAggregationInput[]
    by: InvoiceLineScalarFieldEnum[] | InvoiceLineScalarFieldEnum
    having?: InvoiceLineScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvoiceLineCountAggregateInputType | true
    _avg?: InvoiceLineAvgAggregateInputType
    _sum?: InvoiceLineSumAggregateInputType
    _min?: InvoiceLineMinAggregateInputType
    _max?: InvoiceLineMaxAggregateInputType
  }

  export type InvoiceLineGroupByOutputType = {
    id: string
    invoiceId: string
    itemCode: string
    description: string
    quantity: number
    unit: string
    unitPrice: number
    discountRate: number
    taxRate: number
    fodec: boolean
    exemptionReason: string | null
    lineAmount: number
    taxAmount: number
    totalAmount: number
    createdAt: Date
    updatedAt: Date
    _count: InvoiceLineCountAggregateOutputType | null
    _avg: InvoiceLineAvgAggregateOutputType | null
    _sum: InvoiceLineSumAggregateOutputType | null
    _min: InvoiceLineMinAggregateOutputType | null
    _max: InvoiceLineMaxAggregateOutputType | null
  }

  type GetInvoiceLineGroupByPayload<T extends InvoiceLineGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvoiceLineGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvoiceLineGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvoiceLineGroupByOutputType[P]>
            : GetScalarType<T[P], InvoiceLineGroupByOutputType[P]>
        }
      >
    >


  export type InvoiceLineSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceId?: boolean
    itemCode?: boolean
    description?: boolean
    quantity?: boolean
    unit?: boolean
    unitPrice?: boolean
    discountRate?: boolean
    taxRate?: boolean
    fodec?: boolean
    exemptionReason?: boolean
    lineAmount?: boolean
    taxAmount?: boolean
    totalAmount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
    allowances?: boolean | InvoiceLine$allowancesArgs<ExtArgs>
    _count?: boolean | InvoiceLineCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoiceLine"]>

  export type InvoiceLineSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceId?: boolean
    itemCode?: boolean
    description?: boolean
    quantity?: boolean
    unit?: boolean
    unitPrice?: boolean
    discountRate?: boolean
    taxRate?: boolean
    fodec?: boolean
    exemptionReason?: boolean
    lineAmount?: boolean
    taxAmount?: boolean
    totalAmount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoiceLine"]>

  export type InvoiceLineSelectScalar = {
    id?: boolean
    invoiceId?: boolean
    itemCode?: boolean
    description?: boolean
    quantity?: boolean
    unit?: boolean
    unitPrice?: boolean
    discountRate?: boolean
    taxRate?: boolean
    fodec?: boolean
    exemptionReason?: boolean
    lineAmount?: boolean
    taxAmount?: boolean
    totalAmount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InvoiceLineInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
    allowances?: boolean | InvoiceLine$allowancesArgs<ExtArgs>
    _count?: boolean | InvoiceLineCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type InvoiceLineIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
  }

  export type $InvoiceLinePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InvoiceLine"
    objects: {
      invoice: Prisma.$InvoicePayload<ExtArgs>
      allowances: Prisma.$AllowanceChargePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      invoiceId: string
      itemCode: string
      description: string
      quantity: number
      unit: string
      unitPrice: number
      discountRate: number
      taxRate: number
      fodec: boolean
      exemptionReason: string | null
      lineAmount: number
      taxAmount: number
      totalAmount: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["invoiceLine"]>
    composites: {}
  }

  type InvoiceLineGetPayload<S extends boolean | null | undefined | InvoiceLineDefaultArgs> = $Result.GetResult<Prisma.$InvoiceLinePayload, S>

  type InvoiceLineCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InvoiceLineFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InvoiceLineCountAggregateInputType | true
    }

  export interface InvoiceLineDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InvoiceLine'], meta: { name: 'InvoiceLine' } }
    /**
     * Find zero or one InvoiceLine that matches the filter.
     * @param {InvoiceLineFindUniqueArgs} args - Arguments to find a InvoiceLine
     * @example
     * // Get one InvoiceLine
     * const invoiceLine = await prisma.invoiceLine.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvoiceLineFindUniqueArgs>(args: SelectSubset<T, InvoiceLineFindUniqueArgs<ExtArgs>>): Prisma__InvoiceLineClient<$Result.GetResult<Prisma.$InvoiceLinePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one InvoiceLine that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InvoiceLineFindUniqueOrThrowArgs} args - Arguments to find a InvoiceLine
     * @example
     * // Get one InvoiceLine
     * const invoiceLine = await prisma.invoiceLine.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvoiceLineFindUniqueOrThrowArgs>(args: SelectSubset<T, InvoiceLineFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvoiceLineClient<$Result.GetResult<Prisma.$InvoiceLinePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first InvoiceLine that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceLineFindFirstArgs} args - Arguments to find a InvoiceLine
     * @example
     * // Get one InvoiceLine
     * const invoiceLine = await prisma.invoiceLine.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvoiceLineFindFirstArgs>(args?: SelectSubset<T, InvoiceLineFindFirstArgs<ExtArgs>>): Prisma__InvoiceLineClient<$Result.GetResult<Prisma.$InvoiceLinePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first InvoiceLine that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceLineFindFirstOrThrowArgs} args - Arguments to find a InvoiceLine
     * @example
     * // Get one InvoiceLine
     * const invoiceLine = await prisma.invoiceLine.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvoiceLineFindFirstOrThrowArgs>(args?: SelectSubset<T, InvoiceLineFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvoiceLineClient<$Result.GetResult<Prisma.$InvoiceLinePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more InvoiceLines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceLineFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InvoiceLines
     * const invoiceLines = await prisma.invoiceLine.findMany()
     * 
     * // Get first 10 InvoiceLines
     * const invoiceLines = await prisma.invoiceLine.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invoiceLineWithIdOnly = await prisma.invoiceLine.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvoiceLineFindManyArgs>(args?: SelectSubset<T, InvoiceLineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoiceLinePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a InvoiceLine.
     * @param {InvoiceLineCreateArgs} args - Arguments to create a InvoiceLine.
     * @example
     * // Create one InvoiceLine
     * const InvoiceLine = await prisma.invoiceLine.create({
     *   data: {
     *     // ... data to create a InvoiceLine
     *   }
     * })
     * 
     */
    create<T extends InvoiceLineCreateArgs>(args: SelectSubset<T, InvoiceLineCreateArgs<ExtArgs>>): Prisma__InvoiceLineClient<$Result.GetResult<Prisma.$InvoiceLinePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many InvoiceLines.
     * @param {InvoiceLineCreateManyArgs} args - Arguments to create many InvoiceLines.
     * @example
     * // Create many InvoiceLines
     * const invoiceLine = await prisma.invoiceLine.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvoiceLineCreateManyArgs>(args?: SelectSubset<T, InvoiceLineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InvoiceLines and returns the data saved in the database.
     * @param {InvoiceLineCreateManyAndReturnArgs} args - Arguments to create many InvoiceLines.
     * @example
     * // Create many InvoiceLines
     * const invoiceLine = await prisma.invoiceLine.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InvoiceLines and only return the `id`
     * const invoiceLineWithIdOnly = await prisma.invoiceLine.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InvoiceLineCreateManyAndReturnArgs>(args?: SelectSubset<T, InvoiceLineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoiceLinePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a InvoiceLine.
     * @param {InvoiceLineDeleteArgs} args - Arguments to delete one InvoiceLine.
     * @example
     * // Delete one InvoiceLine
     * const InvoiceLine = await prisma.invoiceLine.delete({
     *   where: {
     *     // ... filter to delete one InvoiceLine
     *   }
     * })
     * 
     */
    delete<T extends InvoiceLineDeleteArgs>(args: SelectSubset<T, InvoiceLineDeleteArgs<ExtArgs>>): Prisma__InvoiceLineClient<$Result.GetResult<Prisma.$InvoiceLinePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one InvoiceLine.
     * @param {InvoiceLineUpdateArgs} args - Arguments to update one InvoiceLine.
     * @example
     * // Update one InvoiceLine
     * const invoiceLine = await prisma.invoiceLine.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvoiceLineUpdateArgs>(args: SelectSubset<T, InvoiceLineUpdateArgs<ExtArgs>>): Prisma__InvoiceLineClient<$Result.GetResult<Prisma.$InvoiceLinePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more InvoiceLines.
     * @param {InvoiceLineDeleteManyArgs} args - Arguments to filter InvoiceLines to delete.
     * @example
     * // Delete a few InvoiceLines
     * const { count } = await prisma.invoiceLine.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvoiceLineDeleteManyArgs>(args?: SelectSubset<T, InvoiceLineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InvoiceLines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceLineUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InvoiceLines
     * const invoiceLine = await prisma.invoiceLine.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvoiceLineUpdateManyArgs>(args: SelectSubset<T, InvoiceLineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one InvoiceLine.
     * @param {InvoiceLineUpsertArgs} args - Arguments to update or create a InvoiceLine.
     * @example
     * // Update or create a InvoiceLine
     * const invoiceLine = await prisma.invoiceLine.upsert({
     *   create: {
     *     // ... data to create a InvoiceLine
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InvoiceLine we want to update
     *   }
     * })
     */
    upsert<T extends InvoiceLineUpsertArgs>(args: SelectSubset<T, InvoiceLineUpsertArgs<ExtArgs>>): Prisma__InvoiceLineClient<$Result.GetResult<Prisma.$InvoiceLinePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of InvoiceLines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceLineCountArgs} args - Arguments to filter InvoiceLines to count.
     * @example
     * // Count the number of InvoiceLines
     * const count = await prisma.invoiceLine.count({
     *   where: {
     *     // ... the filter for the InvoiceLines we want to count
     *   }
     * })
    **/
    count<T extends InvoiceLineCountArgs>(
      args?: Subset<T, InvoiceLineCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvoiceLineCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InvoiceLine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceLineAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvoiceLineAggregateArgs>(args: Subset<T, InvoiceLineAggregateArgs>): Prisma.PrismaPromise<GetInvoiceLineAggregateType<T>>

    /**
     * Group by InvoiceLine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceLineGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvoiceLineGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvoiceLineGroupByArgs['orderBy'] }
        : { orderBy?: InvoiceLineGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvoiceLineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvoiceLineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InvoiceLine model
   */
  readonly fields: InvoiceLineFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InvoiceLine.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvoiceLineClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    invoice<T extends InvoiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InvoiceDefaultArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    allowances<T extends InvoiceLine$allowancesArgs<ExtArgs> = {}>(args?: Subset<T, InvoiceLine$allowancesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AllowanceChargePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InvoiceLine model
   */ 
  interface InvoiceLineFieldRefs {
    readonly id: FieldRef<"InvoiceLine", 'String'>
    readonly invoiceId: FieldRef<"InvoiceLine", 'String'>
    readonly itemCode: FieldRef<"InvoiceLine", 'String'>
    readonly description: FieldRef<"InvoiceLine", 'String'>
    readonly quantity: FieldRef<"InvoiceLine", 'Float'>
    readonly unit: FieldRef<"InvoiceLine", 'String'>
    readonly unitPrice: FieldRef<"InvoiceLine", 'Float'>
    readonly discountRate: FieldRef<"InvoiceLine", 'Float'>
    readonly taxRate: FieldRef<"InvoiceLine", 'Float'>
    readonly fodec: FieldRef<"InvoiceLine", 'Boolean'>
    readonly exemptionReason: FieldRef<"InvoiceLine", 'String'>
    readonly lineAmount: FieldRef<"InvoiceLine", 'Float'>
    readonly taxAmount: FieldRef<"InvoiceLine", 'Float'>
    readonly totalAmount: FieldRef<"InvoiceLine", 'Float'>
    readonly createdAt: FieldRef<"InvoiceLine", 'DateTime'>
    readonly updatedAt: FieldRef<"InvoiceLine", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InvoiceLine findUnique
   */
  export type InvoiceLineFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceLine
     */
    select?: InvoiceLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceLineInclude<ExtArgs> | null
    /**
     * Filter, which InvoiceLine to fetch.
     */
    where: InvoiceLineWhereUniqueInput
  }

  /**
   * InvoiceLine findUniqueOrThrow
   */
  export type InvoiceLineFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceLine
     */
    select?: InvoiceLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceLineInclude<ExtArgs> | null
    /**
     * Filter, which InvoiceLine to fetch.
     */
    where: InvoiceLineWhereUniqueInput
  }

  /**
   * InvoiceLine findFirst
   */
  export type InvoiceLineFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceLine
     */
    select?: InvoiceLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceLineInclude<ExtArgs> | null
    /**
     * Filter, which InvoiceLine to fetch.
     */
    where?: InvoiceLineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvoiceLines to fetch.
     */
    orderBy?: InvoiceLineOrderByWithRelationInput | InvoiceLineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InvoiceLines.
     */
    cursor?: InvoiceLineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvoiceLines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvoiceLines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InvoiceLines.
     */
    distinct?: InvoiceLineScalarFieldEnum | InvoiceLineScalarFieldEnum[]
  }

  /**
   * InvoiceLine findFirstOrThrow
   */
  export type InvoiceLineFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceLine
     */
    select?: InvoiceLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceLineInclude<ExtArgs> | null
    /**
     * Filter, which InvoiceLine to fetch.
     */
    where?: InvoiceLineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvoiceLines to fetch.
     */
    orderBy?: InvoiceLineOrderByWithRelationInput | InvoiceLineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InvoiceLines.
     */
    cursor?: InvoiceLineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvoiceLines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvoiceLines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InvoiceLines.
     */
    distinct?: InvoiceLineScalarFieldEnum | InvoiceLineScalarFieldEnum[]
  }

  /**
   * InvoiceLine findMany
   */
  export type InvoiceLineFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceLine
     */
    select?: InvoiceLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceLineInclude<ExtArgs> | null
    /**
     * Filter, which InvoiceLines to fetch.
     */
    where?: InvoiceLineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvoiceLines to fetch.
     */
    orderBy?: InvoiceLineOrderByWithRelationInput | InvoiceLineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InvoiceLines.
     */
    cursor?: InvoiceLineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvoiceLines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvoiceLines.
     */
    skip?: number
    distinct?: InvoiceLineScalarFieldEnum | InvoiceLineScalarFieldEnum[]
  }

  /**
   * InvoiceLine create
   */
  export type InvoiceLineCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceLine
     */
    select?: InvoiceLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceLineInclude<ExtArgs> | null
    /**
     * The data needed to create a InvoiceLine.
     */
    data: XOR<InvoiceLineCreateInput, InvoiceLineUncheckedCreateInput>
  }

  /**
   * InvoiceLine createMany
   */
  export type InvoiceLineCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InvoiceLines.
     */
    data: InvoiceLineCreateManyInput | InvoiceLineCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InvoiceLine createManyAndReturn
   */
  export type InvoiceLineCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceLine
     */
    select?: InvoiceLineSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many InvoiceLines.
     */
    data: InvoiceLineCreateManyInput | InvoiceLineCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceLineIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * InvoiceLine update
   */
  export type InvoiceLineUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceLine
     */
    select?: InvoiceLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceLineInclude<ExtArgs> | null
    /**
     * The data needed to update a InvoiceLine.
     */
    data: XOR<InvoiceLineUpdateInput, InvoiceLineUncheckedUpdateInput>
    /**
     * Choose, which InvoiceLine to update.
     */
    where: InvoiceLineWhereUniqueInput
  }

  /**
   * InvoiceLine updateMany
   */
  export type InvoiceLineUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InvoiceLines.
     */
    data: XOR<InvoiceLineUpdateManyMutationInput, InvoiceLineUncheckedUpdateManyInput>
    /**
     * Filter which InvoiceLines to update
     */
    where?: InvoiceLineWhereInput
  }

  /**
   * InvoiceLine upsert
   */
  export type InvoiceLineUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceLine
     */
    select?: InvoiceLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceLineInclude<ExtArgs> | null
    /**
     * The filter to search for the InvoiceLine to update in case it exists.
     */
    where: InvoiceLineWhereUniqueInput
    /**
     * In case the InvoiceLine found by the `where` argument doesn't exist, create a new InvoiceLine with this data.
     */
    create: XOR<InvoiceLineCreateInput, InvoiceLineUncheckedCreateInput>
    /**
     * In case the InvoiceLine was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvoiceLineUpdateInput, InvoiceLineUncheckedUpdateInput>
  }

  /**
   * InvoiceLine delete
   */
  export type InvoiceLineDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceLine
     */
    select?: InvoiceLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceLineInclude<ExtArgs> | null
    /**
     * Filter which InvoiceLine to delete.
     */
    where: InvoiceLineWhereUniqueInput
  }

  /**
   * InvoiceLine deleteMany
   */
  export type InvoiceLineDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InvoiceLines to delete
     */
    where?: InvoiceLineWhereInput
  }

  /**
   * InvoiceLine.allowances
   */
  export type InvoiceLine$allowancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllowanceCharge
     */
    select?: AllowanceChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllowanceChargeInclude<ExtArgs> | null
    where?: AllowanceChargeWhereInput
    orderBy?: AllowanceChargeOrderByWithRelationInput | AllowanceChargeOrderByWithRelationInput[]
    cursor?: AllowanceChargeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AllowanceChargeScalarFieldEnum | AllowanceChargeScalarFieldEnum[]
  }

  /**
   * InvoiceLine without action
   */
  export type InvoiceLineDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceLine
     */
    select?: InvoiceLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceLineInclude<ExtArgs> | null
  }


  /**
   * Model AllowanceCharge
   */

  export type AggregateAllowanceCharge = {
    _count: AllowanceChargeCountAggregateOutputType | null
    _avg: AllowanceChargeAvgAggregateOutputType | null
    _sum: AllowanceChargeSumAggregateOutputType | null
    _min: AllowanceChargeMinAggregateOutputType | null
    _max: AllowanceChargeMaxAggregateOutputType | null
  }

  export type AllowanceChargeAvgAggregateOutputType = {
    amount: number | null
  }

  export type AllowanceChargeSumAggregateOutputType = {
    amount: number | null
  }

  export type AllowanceChargeMinAggregateOutputType = {
    id: string | null
    type: string | null
    code: string | null
    description: string | null
    amount: number | null
    basedOn: string | null
    invoiceId: string | null
    lineId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AllowanceChargeMaxAggregateOutputType = {
    id: string | null
    type: string | null
    code: string | null
    description: string | null
    amount: number | null
    basedOn: string | null
    invoiceId: string | null
    lineId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AllowanceChargeCountAggregateOutputType = {
    id: number
    type: number
    code: number
    description: number
    amount: number
    basedOn: number
    invoiceId: number
    lineId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AllowanceChargeAvgAggregateInputType = {
    amount?: true
  }

  export type AllowanceChargeSumAggregateInputType = {
    amount?: true
  }

  export type AllowanceChargeMinAggregateInputType = {
    id?: true
    type?: true
    code?: true
    description?: true
    amount?: true
    basedOn?: true
    invoiceId?: true
    lineId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AllowanceChargeMaxAggregateInputType = {
    id?: true
    type?: true
    code?: true
    description?: true
    amount?: true
    basedOn?: true
    invoiceId?: true
    lineId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AllowanceChargeCountAggregateInputType = {
    id?: true
    type?: true
    code?: true
    description?: true
    amount?: true
    basedOn?: true
    invoiceId?: true
    lineId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AllowanceChargeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AllowanceCharge to aggregate.
     */
    where?: AllowanceChargeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AllowanceCharges to fetch.
     */
    orderBy?: AllowanceChargeOrderByWithRelationInput | AllowanceChargeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AllowanceChargeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AllowanceCharges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AllowanceCharges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AllowanceCharges
    **/
    _count?: true | AllowanceChargeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AllowanceChargeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AllowanceChargeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AllowanceChargeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AllowanceChargeMaxAggregateInputType
  }

  export type GetAllowanceChargeAggregateType<T extends AllowanceChargeAggregateArgs> = {
        [P in keyof T & keyof AggregateAllowanceCharge]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAllowanceCharge[P]>
      : GetScalarType<T[P], AggregateAllowanceCharge[P]>
  }




  export type AllowanceChargeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AllowanceChargeWhereInput
    orderBy?: AllowanceChargeOrderByWithAggregationInput | AllowanceChargeOrderByWithAggregationInput[]
    by: AllowanceChargeScalarFieldEnum[] | AllowanceChargeScalarFieldEnum
    having?: AllowanceChargeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AllowanceChargeCountAggregateInputType | true
    _avg?: AllowanceChargeAvgAggregateInputType
    _sum?: AllowanceChargeSumAggregateInputType
    _min?: AllowanceChargeMinAggregateInputType
    _max?: AllowanceChargeMaxAggregateInputType
  }

  export type AllowanceChargeGroupByOutputType = {
    id: string
    type: string
    code: string
    description: string
    amount: number
    basedOn: string | null
    invoiceId: string | null
    lineId: string | null
    createdAt: Date
    updatedAt: Date
    _count: AllowanceChargeCountAggregateOutputType | null
    _avg: AllowanceChargeAvgAggregateOutputType | null
    _sum: AllowanceChargeSumAggregateOutputType | null
    _min: AllowanceChargeMinAggregateOutputType | null
    _max: AllowanceChargeMaxAggregateOutputType | null
  }

  type GetAllowanceChargeGroupByPayload<T extends AllowanceChargeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AllowanceChargeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AllowanceChargeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AllowanceChargeGroupByOutputType[P]>
            : GetScalarType<T[P], AllowanceChargeGroupByOutputType[P]>
        }
      >
    >


  export type AllowanceChargeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    code?: boolean
    description?: boolean
    amount?: boolean
    basedOn?: boolean
    invoiceId?: boolean
    lineId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    invoice?: boolean | AllowanceCharge$invoiceArgs<ExtArgs>
    line?: boolean | AllowanceCharge$lineArgs<ExtArgs>
  }, ExtArgs["result"]["allowanceCharge"]>

  export type AllowanceChargeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    code?: boolean
    description?: boolean
    amount?: boolean
    basedOn?: boolean
    invoiceId?: boolean
    lineId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    invoice?: boolean | AllowanceCharge$invoiceArgs<ExtArgs>
    line?: boolean | AllowanceCharge$lineArgs<ExtArgs>
  }, ExtArgs["result"]["allowanceCharge"]>

  export type AllowanceChargeSelectScalar = {
    id?: boolean
    type?: boolean
    code?: boolean
    description?: boolean
    amount?: boolean
    basedOn?: boolean
    invoiceId?: boolean
    lineId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AllowanceChargeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invoice?: boolean | AllowanceCharge$invoiceArgs<ExtArgs>
    line?: boolean | AllowanceCharge$lineArgs<ExtArgs>
  }
  export type AllowanceChargeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invoice?: boolean | AllowanceCharge$invoiceArgs<ExtArgs>
    line?: boolean | AllowanceCharge$lineArgs<ExtArgs>
  }

  export type $AllowanceChargePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AllowanceCharge"
    objects: {
      invoice: Prisma.$InvoicePayload<ExtArgs> | null
      line: Prisma.$InvoiceLinePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string
      code: string
      description: string
      amount: number
      basedOn: string | null
      invoiceId: string | null
      lineId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["allowanceCharge"]>
    composites: {}
  }

  type AllowanceChargeGetPayload<S extends boolean | null | undefined | AllowanceChargeDefaultArgs> = $Result.GetResult<Prisma.$AllowanceChargePayload, S>

  type AllowanceChargeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AllowanceChargeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AllowanceChargeCountAggregateInputType | true
    }

  export interface AllowanceChargeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AllowanceCharge'], meta: { name: 'AllowanceCharge' } }
    /**
     * Find zero or one AllowanceCharge that matches the filter.
     * @param {AllowanceChargeFindUniqueArgs} args - Arguments to find a AllowanceCharge
     * @example
     * // Get one AllowanceCharge
     * const allowanceCharge = await prisma.allowanceCharge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AllowanceChargeFindUniqueArgs>(args: SelectSubset<T, AllowanceChargeFindUniqueArgs<ExtArgs>>): Prisma__AllowanceChargeClient<$Result.GetResult<Prisma.$AllowanceChargePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AllowanceCharge that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AllowanceChargeFindUniqueOrThrowArgs} args - Arguments to find a AllowanceCharge
     * @example
     * // Get one AllowanceCharge
     * const allowanceCharge = await prisma.allowanceCharge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AllowanceChargeFindUniqueOrThrowArgs>(args: SelectSubset<T, AllowanceChargeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AllowanceChargeClient<$Result.GetResult<Prisma.$AllowanceChargePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AllowanceCharge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllowanceChargeFindFirstArgs} args - Arguments to find a AllowanceCharge
     * @example
     * // Get one AllowanceCharge
     * const allowanceCharge = await prisma.allowanceCharge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AllowanceChargeFindFirstArgs>(args?: SelectSubset<T, AllowanceChargeFindFirstArgs<ExtArgs>>): Prisma__AllowanceChargeClient<$Result.GetResult<Prisma.$AllowanceChargePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AllowanceCharge that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllowanceChargeFindFirstOrThrowArgs} args - Arguments to find a AllowanceCharge
     * @example
     * // Get one AllowanceCharge
     * const allowanceCharge = await prisma.allowanceCharge.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AllowanceChargeFindFirstOrThrowArgs>(args?: SelectSubset<T, AllowanceChargeFindFirstOrThrowArgs<ExtArgs>>): Prisma__AllowanceChargeClient<$Result.GetResult<Prisma.$AllowanceChargePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AllowanceCharges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllowanceChargeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AllowanceCharges
     * const allowanceCharges = await prisma.allowanceCharge.findMany()
     * 
     * // Get first 10 AllowanceCharges
     * const allowanceCharges = await prisma.allowanceCharge.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const allowanceChargeWithIdOnly = await prisma.allowanceCharge.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AllowanceChargeFindManyArgs>(args?: SelectSubset<T, AllowanceChargeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AllowanceChargePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AllowanceCharge.
     * @param {AllowanceChargeCreateArgs} args - Arguments to create a AllowanceCharge.
     * @example
     * // Create one AllowanceCharge
     * const AllowanceCharge = await prisma.allowanceCharge.create({
     *   data: {
     *     // ... data to create a AllowanceCharge
     *   }
     * })
     * 
     */
    create<T extends AllowanceChargeCreateArgs>(args: SelectSubset<T, AllowanceChargeCreateArgs<ExtArgs>>): Prisma__AllowanceChargeClient<$Result.GetResult<Prisma.$AllowanceChargePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AllowanceCharges.
     * @param {AllowanceChargeCreateManyArgs} args - Arguments to create many AllowanceCharges.
     * @example
     * // Create many AllowanceCharges
     * const allowanceCharge = await prisma.allowanceCharge.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AllowanceChargeCreateManyArgs>(args?: SelectSubset<T, AllowanceChargeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AllowanceCharges and returns the data saved in the database.
     * @param {AllowanceChargeCreateManyAndReturnArgs} args - Arguments to create many AllowanceCharges.
     * @example
     * // Create many AllowanceCharges
     * const allowanceCharge = await prisma.allowanceCharge.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AllowanceCharges and only return the `id`
     * const allowanceChargeWithIdOnly = await prisma.allowanceCharge.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AllowanceChargeCreateManyAndReturnArgs>(args?: SelectSubset<T, AllowanceChargeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AllowanceChargePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AllowanceCharge.
     * @param {AllowanceChargeDeleteArgs} args - Arguments to delete one AllowanceCharge.
     * @example
     * // Delete one AllowanceCharge
     * const AllowanceCharge = await prisma.allowanceCharge.delete({
     *   where: {
     *     // ... filter to delete one AllowanceCharge
     *   }
     * })
     * 
     */
    delete<T extends AllowanceChargeDeleteArgs>(args: SelectSubset<T, AllowanceChargeDeleteArgs<ExtArgs>>): Prisma__AllowanceChargeClient<$Result.GetResult<Prisma.$AllowanceChargePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AllowanceCharge.
     * @param {AllowanceChargeUpdateArgs} args - Arguments to update one AllowanceCharge.
     * @example
     * // Update one AllowanceCharge
     * const allowanceCharge = await prisma.allowanceCharge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AllowanceChargeUpdateArgs>(args: SelectSubset<T, AllowanceChargeUpdateArgs<ExtArgs>>): Prisma__AllowanceChargeClient<$Result.GetResult<Prisma.$AllowanceChargePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AllowanceCharges.
     * @param {AllowanceChargeDeleteManyArgs} args - Arguments to filter AllowanceCharges to delete.
     * @example
     * // Delete a few AllowanceCharges
     * const { count } = await prisma.allowanceCharge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AllowanceChargeDeleteManyArgs>(args?: SelectSubset<T, AllowanceChargeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AllowanceCharges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllowanceChargeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AllowanceCharges
     * const allowanceCharge = await prisma.allowanceCharge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AllowanceChargeUpdateManyArgs>(args: SelectSubset<T, AllowanceChargeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AllowanceCharge.
     * @param {AllowanceChargeUpsertArgs} args - Arguments to update or create a AllowanceCharge.
     * @example
     * // Update or create a AllowanceCharge
     * const allowanceCharge = await prisma.allowanceCharge.upsert({
     *   create: {
     *     // ... data to create a AllowanceCharge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AllowanceCharge we want to update
     *   }
     * })
     */
    upsert<T extends AllowanceChargeUpsertArgs>(args: SelectSubset<T, AllowanceChargeUpsertArgs<ExtArgs>>): Prisma__AllowanceChargeClient<$Result.GetResult<Prisma.$AllowanceChargePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AllowanceCharges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllowanceChargeCountArgs} args - Arguments to filter AllowanceCharges to count.
     * @example
     * // Count the number of AllowanceCharges
     * const count = await prisma.allowanceCharge.count({
     *   where: {
     *     // ... the filter for the AllowanceCharges we want to count
     *   }
     * })
    **/
    count<T extends AllowanceChargeCountArgs>(
      args?: Subset<T, AllowanceChargeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AllowanceChargeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AllowanceCharge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllowanceChargeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AllowanceChargeAggregateArgs>(args: Subset<T, AllowanceChargeAggregateArgs>): Prisma.PrismaPromise<GetAllowanceChargeAggregateType<T>>

    /**
     * Group by AllowanceCharge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllowanceChargeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AllowanceChargeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AllowanceChargeGroupByArgs['orderBy'] }
        : { orderBy?: AllowanceChargeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AllowanceChargeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAllowanceChargeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AllowanceCharge model
   */
  readonly fields: AllowanceChargeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AllowanceCharge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AllowanceChargeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    invoice<T extends AllowanceCharge$invoiceArgs<ExtArgs> = {}>(args?: Subset<T, AllowanceCharge$invoiceArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    line<T extends AllowanceCharge$lineArgs<ExtArgs> = {}>(args?: Subset<T, AllowanceCharge$lineArgs<ExtArgs>>): Prisma__InvoiceLineClient<$Result.GetResult<Prisma.$InvoiceLinePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AllowanceCharge model
   */ 
  interface AllowanceChargeFieldRefs {
    readonly id: FieldRef<"AllowanceCharge", 'String'>
    readonly type: FieldRef<"AllowanceCharge", 'String'>
    readonly code: FieldRef<"AllowanceCharge", 'String'>
    readonly description: FieldRef<"AllowanceCharge", 'String'>
    readonly amount: FieldRef<"AllowanceCharge", 'Float'>
    readonly basedOn: FieldRef<"AllowanceCharge", 'String'>
    readonly invoiceId: FieldRef<"AllowanceCharge", 'String'>
    readonly lineId: FieldRef<"AllowanceCharge", 'String'>
    readonly createdAt: FieldRef<"AllowanceCharge", 'DateTime'>
    readonly updatedAt: FieldRef<"AllowanceCharge", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AllowanceCharge findUnique
   */
  export type AllowanceChargeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllowanceCharge
     */
    select?: AllowanceChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllowanceChargeInclude<ExtArgs> | null
    /**
     * Filter, which AllowanceCharge to fetch.
     */
    where: AllowanceChargeWhereUniqueInput
  }

  /**
   * AllowanceCharge findUniqueOrThrow
   */
  export type AllowanceChargeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllowanceCharge
     */
    select?: AllowanceChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllowanceChargeInclude<ExtArgs> | null
    /**
     * Filter, which AllowanceCharge to fetch.
     */
    where: AllowanceChargeWhereUniqueInput
  }

  /**
   * AllowanceCharge findFirst
   */
  export type AllowanceChargeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllowanceCharge
     */
    select?: AllowanceChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllowanceChargeInclude<ExtArgs> | null
    /**
     * Filter, which AllowanceCharge to fetch.
     */
    where?: AllowanceChargeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AllowanceCharges to fetch.
     */
    orderBy?: AllowanceChargeOrderByWithRelationInput | AllowanceChargeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AllowanceCharges.
     */
    cursor?: AllowanceChargeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AllowanceCharges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AllowanceCharges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AllowanceCharges.
     */
    distinct?: AllowanceChargeScalarFieldEnum | AllowanceChargeScalarFieldEnum[]
  }

  /**
   * AllowanceCharge findFirstOrThrow
   */
  export type AllowanceChargeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllowanceCharge
     */
    select?: AllowanceChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllowanceChargeInclude<ExtArgs> | null
    /**
     * Filter, which AllowanceCharge to fetch.
     */
    where?: AllowanceChargeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AllowanceCharges to fetch.
     */
    orderBy?: AllowanceChargeOrderByWithRelationInput | AllowanceChargeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AllowanceCharges.
     */
    cursor?: AllowanceChargeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AllowanceCharges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AllowanceCharges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AllowanceCharges.
     */
    distinct?: AllowanceChargeScalarFieldEnum | AllowanceChargeScalarFieldEnum[]
  }

  /**
   * AllowanceCharge findMany
   */
  export type AllowanceChargeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllowanceCharge
     */
    select?: AllowanceChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllowanceChargeInclude<ExtArgs> | null
    /**
     * Filter, which AllowanceCharges to fetch.
     */
    where?: AllowanceChargeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AllowanceCharges to fetch.
     */
    orderBy?: AllowanceChargeOrderByWithRelationInput | AllowanceChargeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AllowanceCharges.
     */
    cursor?: AllowanceChargeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AllowanceCharges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AllowanceCharges.
     */
    skip?: number
    distinct?: AllowanceChargeScalarFieldEnum | AllowanceChargeScalarFieldEnum[]
  }

  /**
   * AllowanceCharge create
   */
  export type AllowanceChargeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllowanceCharge
     */
    select?: AllowanceChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllowanceChargeInclude<ExtArgs> | null
    /**
     * The data needed to create a AllowanceCharge.
     */
    data: XOR<AllowanceChargeCreateInput, AllowanceChargeUncheckedCreateInput>
  }

  /**
   * AllowanceCharge createMany
   */
  export type AllowanceChargeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AllowanceCharges.
     */
    data: AllowanceChargeCreateManyInput | AllowanceChargeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AllowanceCharge createManyAndReturn
   */
  export type AllowanceChargeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllowanceCharge
     */
    select?: AllowanceChargeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AllowanceCharges.
     */
    data: AllowanceChargeCreateManyInput | AllowanceChargeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllowanceChargeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AllowanceCharge update
   */
  export type AllowanceChargeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllowanceCharge
     */
    select?: AllowanceChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllowanceChargeInclude<ExtArgs> | null
    /**
     * The data needed to update a AllowanceCharge.
     */
    data: XOR<AllowanceChargeUpdateInput, AllowanceChargeUncheckedUpdateInput>
    /**
     * Choose, which AllowanceCharge to update.
     */
    where: AllowanceChargeWhereUniqueInput
  }

  /**
   * AllowanceCharge updateMany
   */
  export type AllowanceChargeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AllowanceCharges.
     */
    data: XOR<AllowanceChargeUpdateManyMutationInput, AllowanceChargeUncheckedUpdateManyInput>
    /**
     * Filter which AllowanceCharges to update
     */
    where?: AllowanceChargeWhereInput
  }

  /**
   * AllowanceCharge upsert
   */
  export type AllowanceChargeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllowanceCharge
     */
    select?: AllowanceChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllowanceChargeInclude<ExtArgs> | null
    /**
     * The filter to search for the AllowanceCharge to update in case it exists.
     */
    where: AllowanceChargeWhereUniqueInput
    /**
     * In case the AllowanceCharge found by the `where` argument doesn't exist, create a new AllowanceCharge with this data.
     */
    create: XOR<AllowanceChargeCreateInput, AllowanceChargeUncheckedCreateInput>
    /**
     * In case the AllowanceCharge was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AllowanceChargeUpdateInput, AllowanceChargeUncheckedUpdateInput>
  }

  /**
   * AllowanceCharge delete
   */
  export type AllowanceChargeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllowanceCharge
     */
    select?: AllowanceChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllowanceChargeInclude<ExtArgs> | null
    /**
     * Filter which AllowanceCharge to delete.
     */
    where: AllowanceChargeWhereUniqueInput
  }

  /**
   * AllowanceCharge deleteMany
   */
  export type AllowanceChargeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AllowanceCharges to delete
     */
    where?: AllowanceChargeWhereInput
  }

  /**
   * AllowanceCharge.invoice
   */
  export type AllowanceCharge$invoiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    where?: InvoiceWhereInput
  }

  /**
   * AllowanceCharge.line
   */
  export type AllowanceCharge$lineArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceLine
     */
    select?: InvoiceLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceLineInclude<ExtArgs> | null
    where?: InvoiceLineWhereInput
  }

  /**
   * AllowanceCharge without action
   */
  export type AllowanceChargeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllowanceCharge
     */
    select?: AllowanceChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllowanceChargeInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    passwordHash: 'passwordHash',
    emailVerified: 'emailVerified',
    verificationCode: 'verificationCode',
    verificationCodeExpires: 'verificationCodeExpires',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserSignatureScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    certificateFilename: 'certificateFilename',
    encryptedContent: 'encryptedContent',
    signaturePinHash: 'signaturePinHash',
    certificateSubject: 'certificateSubject',
    certificateIssuer: 'certificateIssuer',
    certificateSerialNumber: 'certificateSerialNumber',
    certificateValidFrom: 'certificateValidFrom',
    certificateValidUntil: 'certificateValidUntil',
    keyAlgorithm: 'keyAlgorithm',
    status: 'status',
    uploadedAt: 'uploadedAt',
    lastUsedAt: 'lastUsedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserSignatureScalarFieldEnum = (typeof UserSignatureScalarFieldEnum)[keyof typeof UserSignatureScalarFieldEnum]


  export const SignatureAuditScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    action: 'action',
    invoiceId: 'invoiceId',
    documentNumber: 'documentNumber',
    status: 'status',
    errorMessage: 'errorMessage',
    certificateUsed: 'certificateUsed',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    createdAt: 'createdAt'
  };

  export type SignatureAuditScalarFieldEnum = (typeof SignatureAuditScalarFieldEnum)[keyof typeof SignatureAuditScalarFieldEnum]


  export const RefreshTokenScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    tokenHash: 'tokenHash',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    revokedAt: 'revokedAt'
  };

  export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum]


  export const InvoiceScalarFieldEnum: {
    id: 'id',
    documentType: 'documentType',
    documentNumber: 'documentNumber',
    invoiceDate: 'invoiceDate',
    dueDate: 'dueDate',
    deliveryDate: 'deliveryDate',
    dispatchDate: 'dispatchDate',
    paymentDate: 'paymentDate',
    signatureDate: 'signatureDate',
    otherDate: 'otherDate',
    periodStart: 'periodStart',
    periodEnd: 'periodEnd',
    operationNature: 'operationNature',
    currency: 'currency',
    orderReference: 'orderReference',
    contractReference: 'contractReference',
    deliveryNoteReference: 'deliveryNoteReference',
    userId: 'userId',
    supplierId: 'supplierId',
    buyerId: 'buyerId',
    globalDiscount: 'globalDiscount',
    stampDuty: 'stampDuty',
    ttnReference: 'ttnReference',
    paymentMeans: 'paymentMeans',
    bankName: 'bankName',
    bankCode: 'bankCode',
    bankRib: 'bankRib',
    bankAccountOwner: 'bankAccountOwner',
    checkNumber: 'checkNumber',
    cardType: 'cardType',
    cardLast4: 'cardLast4',
    cardReference: 'cardReference',
    postalAccountNumber: 'postalAccountNumber',
    postalAccountOwner: 'postalAccountOwner',
    postalBranchCode: 'postalBranchCode',
    postalServiceName: 'postalServiceName',
    ePaymentGateway: 'ePaymentGateway',
    ePaymentTransactionId: 'ePaymentTransactionId',
    otherPaymentDescription: 'otherPaymentDescription',
    otherPaymentReference: 'otherPaymentReference',
    ircRate: 'ircRate',
    ircAmount: 'ircAmount',
    ircExemptionReason: 'ircExemptionReason',
    qrCodeEnabled: 'qrCodeEnabled',
    qrCodeContent: 'qrCodeContent',
    amountDescriptionOverride: 'amountDescriptionOverride',
    amountLanguage: 'amountLanguage',
    xmlContent: 'xmlContent',
    status: 'status',
    totalHT: 'totalHT',
    totalTVA: 'totalTVA',
    totalTTC: 'totalTTC',
    deletedAt: 'deletedAt',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InvoiceScalarFieldEnum = (typeof InvoiceScalarFieldEnum)[keyof typeof InvoiceScalarFieldEnum]


  export const PartnerScalarFieldEnum: {
    id: 'id',
    idType: 'idType',
    idValue: 'idValue',
    name: 'name',
    addressDescription: 'addressDescription',
    street: 'street',
    city: 'city',
    postalCode: 'postalCode',
    country: 'country',
    rc: 'rc',
    capital: 'capital',
    phone: 'phone',
    email: 'email',
    partnerType: 'partnerType',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PartnerScalarFieldEnum = (typeof PartnerScalarFieldEnum)[keyof typeof PartnerScalarFieldEnum]


  export const InvoiceLineScalarFieldEnum: {
    id: 'id',
    invoiceId: 'invoiceId',
    itemCode: 'itemCode',
    description: 'description',
    quantity: 'quantity',
    unit: 'unit',
    unitPrice: 'unitPrice',
    discountRate: 'discountRate',
    taxRate: 'taxRate',
    fodec: 'fodec',
    exemptionReason: 'exemptionReason',
    lineAmount: 'lineAmount',
    taxAmount: 'taxAmount',
    totalAmount: 'totalAmount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InvoiceLineScalarFieldEnum = (typeof InvoiceLineScalarFieldEnum)[keyof typeof InvoiceLineScalarFieldEnum]


  export const AllowanceChargeScalarFieldEnum: {
    id: 'id',
    type: 'type',
    code: 'code',
    description: 'description',
    amount: 'amount',
    basedOn: 'basedOn',
    invoiceId: 'invoiceId',
    lineId: 'lineId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AllowanceChargeScalarFieldEnum = (typeof AllowanceChargeScalarFieldEnum)[keyof typeof AllowanceChargeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    verificationCode?: StringNullableFilter<"User"> | string | null
    verificationCodeExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    invoices?: InvoiceListRelationFilter
    refreshTokens?: RefreshTokenListRelationFilter
    signature?: XOR<UserSignatureNullableRelationFilter, UserSignatureWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    emailVerified?: SortOrder
    verificationCode?: SortOrderInput | SortOrder
    verificationCodeExpires?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    invoices?: InvoiceOrderByRelationAggregateInput
    refreshTokens?: RefreshTokenOrderByRelationAggregateInput
    signature?: UserSignatureOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    verificationCode?: StringNullableFilter<"User"> | string | null
    verificationCodeExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    invoices?: InvoiceListRelationFilter
    refreshTokens?: RefreshTokenListRelationFilter
    signature?: XOR<UserSignatureNullableRelationFilter, UserSignatureWhereInput> | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    emailVerified?: SortOrder
    verificationCode?: SortOrderInput | SortOrder
    verificationCodeExpires?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    verificationCode?: StringNullableWithAggregatesFilter<"User"> | string | null
    verificationCodeExpires?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type UserSignatureWhereInput = {
    AND?: UserSignatureWhereInput | UserSignatureWhereInput[]
    OR?: UserSignatureWhereInput[]
    NOT?: UserSignatureWhereInput | UserSignatureWhereInput[]
    id?: StringFilter<"UserSignature"> | string
    userId?: StringFilter<"UserSignature"> | string
    certificateFilename?: StringFilter<"UserSignature"> | string
    encryptedContent?: StringFilter<"UserSignature"> | string
    signaturePinHash?: StringFilter<"UserSignature"> | string
    certificateSubject?: StringNullableFilter<"UserSignature"> | string | null
    certificateIssuer?: StringNullableFilter<"UserSignature"> | string | null
    certificateSerialNumber?: StringNullableFilter<"UserSignature"> | string | null
    certificateValidFrom?: DateTimeNullableFilter<"UserSignature"> | Date | string | null
    certificateValidUntil?: DateTimeNullableFilter<"UserSignature"> | Date | string | null
    keyAlgorithm?: StringNullableFilter<"UserSignature"> | string | null
    status?: StringFilter<"UserSignature"> | string
    uploadedAt?: DateTimeFilter<"UserSignature"> | Date | string
    lastUsedAt?: DateTimeNullableFilter<"UserSignature"> | Date | string | null
    createdAt?: DateTimeFilter<"UserSignature"> | Date | string
    updatedAt?: DateTimeFilter<"UserSignature"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type UserSignatureOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    certificateFilename?: SortOrder
    encryptedContent?: SortOrder
    signaturePinHash?: SortOrder
    certificateSubject?: SortOrderInput | SortOrder
    certificateIssuer?: SortOrderInput | SortOrder
    certificateSerialNumber?: SortOrderInput | SortOrder
    certificateValidFrom?: SortOrderInput | SortOrder
    certificateValidUntil?: SortOrderInput | SortOrder
    keyAlgorithm?: SortOrderInput | SortOrder
    status?: SortOrder
    uploadedAt?: SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserSignatureWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: UserSignatureWhereInput | UserSignatureWhereInput[]
    OR?: UserSignatureWhereInput[]
    NOT?: UserSignatureWhereInput | UserSignatureWhereInput[]
    certificateFilename?: StringFilter<"UserSignature"> | string
    encryptedContent?: StringFilter<"UserSignature"> | string
    signaturePinHash?: StringFilter<"UserSignature"> | string
    certificateSubject?: StringNullableFilter<"UserSignature"> | string | null
    certificateIssuer?: StringNullableFilter<"UserSignature"> | string | null
    certificateSerialNumber?: StringNullableFilter<"UserSignature"> | string | null
    certificateValidFrom?: DateTimeNullableFilter<"UserSignature"> | Date | string | null
    certificateValidUntil?: DateTimeNullableFilter<"UserSignature"> | Date | string | null
    keyAlgorithm?: StringNullableFilter<"UserSignature"> | string | null
    status?: StringFilter<"UserSignature"> | string
    uploadedAt?: DateTimeFilter<"UserSignature"> | Date | string
    lastUsedAt?: DateTimeNullableFilter<"UserSignature"> | Date | string | null
    createdAt?: DateTimeFilter<"UserSignature"> | Date | string
    updatedAt?: DateTimeFilter<"UserSignature"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type UserSignatureOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    certificateFilename?: SortOrder
    encryptedContent?: SortOrder
    signaturePinHash?: SortOrder
    certificateSubject?: SortOrderInput | SortOrder
    certificateIssuer?: SortOrderInput | SortOrder
    certificateSerialNumber?: SortOrderInput | SortOrder
    certificateValidFrom?: SortOrderInput | SortOrder
    certificateValidUntil?: SortOrderInput | SortOrder
    keyAlgorithm?: SortOrderInput | SortOrder
    status?: SortOrder
    uploadedAt?: SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserSignatureCountOrderByAggregateInput
    _max?: UserSignatureMaxOrderByAggregateInput
    _min?: UserSignatureMinOrderByAggregateInput
  }

  export type UserSignatureScalarWhereWithAggregatesInput = {
    AND?: UserSignatureScalarWhereWithAggregatesInput | UserSignatureScalarWhereWithAggregatesInput[]
    OR?: UserSignatureScalarWhereWithAggregatesInput[]
    NOT?: UserSignatureScalarWhereWithAggregatesInput | UserSignatureScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserSignature"> | string
    userId?: StringWithAggregatesFilter<"UserSignature"> | string
    certificateFilename?: StringWithAggregatesFilter<"UserSignature"> | string
    encryptedContent?: StringWithAggregatesFilter<"UserSignature"> | string
    signaturePinHash?: StringWithAggregatesFilter<"UserSignature"> | string
    certificateSubject?: StringNullableWithAggregatesFilter<"UserSignature"> | string | null
    certificateIssuer?: StringNullableWithAggregatesFilter<"UserSignature"> | string | null
    certificateSerialNumber?: StringNullableWithAggregatesFilter<"UserSignature"> | string | null
    certificateValidFrom?: DateTimeNullableWithAggregatesFilter<"UserSignature"> | Date | string | null
    certificateValidUntil?: DateTimeNullableWithAggregatesFilter<"UserSignature"> | Date | string | null
    keyAlgorithm?: StringNullableWithAggregatesFilter<"UserSignature"> | string | null
    status?: StringWithAggregatesFilter<"UserSignature"> | string
    uploadedAt?: DateTimeWithAggregatesFilter<"UserSignature"> | Date | string
    lastUsedAt?: DateTimeNullableWithAggregatesFilter<"UserSignature"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"UserSignature"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserSignature"> | Date | string
  }

  export type SignatureAuditWhereInput = {
    AND?: SignatureAuditWhereInput | SignatureAuditWhereInput[]
    OR?: SignatureAuditWhereInput[]
    NOT?: SignatureAuditWhereInput | SignatureAuditWhereInput[]
    id?: StringFilter<"SignatureAudit"> | string
    userId?: StringFilter<"SignatureAudit"> | string
    action?: StringFilter<"SignatureAudit"> | string
    invoiceId?: StringNullableFilter<"SignatureAudit"> | string | null
    documentNumber?: StringNullableFilter<"SignatureAudit"> | string | null
    status?: StringFilter<"SignatureAudit"> | string
    errorMessage?: StringNullableFilter<"SignatureAudit"> | string | null
    certificateUsed?: StringNullableFilter<"SignatureAudit"> | string | null
    ipAddress?: StringNullableFilter<"SignatureAudit"> | string | null
    userAgent?: StringNullableFilter<"SignatureAudit"> | string | null
    createdAt?: DateTimeFilter<"SignatureAudit"> | Date | string
  }

  export type SignatureAuditOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    invoiceId?: SortOrderInput | SortOrder
    documentNumber?: SortOrderInput | SortOrder
    status?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    certificateUsed?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type SignatureAuditWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SignatureAuditWhereInput | SignatureAuditWhereInput[]
    OR?: SignatureAuditWhereInput[]
    NOT?: SignatureAuditWhereInput | SignatureAuditWhereInput[]
    userId?: StringFilter<"SignatureAudit"> | string
    action?: StringFilter<"SignatureAudit"> | string
    invoiceId?: StringNullableFilter<"SignatureAudit"> | string | null
    documentNumber?: StringNullableFilter<"SignatureAudit"> | string | null
    status?: StringFilter<"SignatureAudit"> | string
    errorMessage?: StringNullableFilter<"SignatureAudit"> | string | null
    certificateUsed?: StringNullableFilter<"SignatureAudit"> | string | null
    ipAddress?: StringNullableFilter<"SignatureAudit"> | string | null
    userAgent?: StringNullableFilter<"SignatureAudit"> | string | null
    createdAt?: DateTimeFilter<"SignatureAudit"> | Date | string
  }, "id">

  export type SignatureAuditOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    invoiceId?: SortOrderInput | SortOrder
    documentNumber?: SortOrderInput | SortOrder
    status?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    certificateUsed?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SignatureAuditCountOrderByAggregateInput
    _max?: SignatureAuditMaxOrderByAggregateInput
    _min?: SignatureAuditMinOrderByAggregateInput
  }

  export type SignatureAuditScalarWhereWithAggregatesInput = {
    AND?: SignatureAuditScalarWhereWithAggregatesInput | SignatureAuditScalarWhereWithAggregatesInput[]
    OR?: SignatureAuditScalarWhereWithAggregatesInput[]
    NOT?: SignatureAuditScalarWhereWithAggregatesInput | SignatureAuditScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SignatureAudit"> | string
    userId?: StringWithAggregatesFilter<"SignatureAudit"> | string
    action?: StringWithAggregatesFilter<"SignatureAudit"> | string
    invoiceId?: StringNullableWithAggregatesFilter<"SignatureAudit"> | string | null
    documentNumber?: StringNullableWithAggregatesFilter<"SignatureAudit"> | string | null
    status?: StringWithAggregatesFilter<"SignatureAudit"> | string
    errorMessage?: StringNullableWithAggregatesFilter<"SignatureAudit"> | string | null
    certificateUsed?: StringNullableWithAggregatesFilter<"SignatureAudit"> | string | null
    ipAddress?: StringNullableWithAggregatesFilter<"SignatureAudit"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"SignatureAudit"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SignatureAudit"> | Date | string
  }

  export type RefreshTokenWhereInput = {
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    userId?: StringFilter<"RefreshToken"> | string
    tokenHash?: StringFilter<"RefreshToken"> | string
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    revokedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type RefreshTokenOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type RefreshTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tokenHash?: string
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    userId?: StringFilter<"RefreshToken"> | string
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    revokedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "tokenHash">

  export type RefreshTokenOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    _count?: RefreshTokenCountOrderByAggregateInput
    _max?: RefreshTokenMaxOrderByAggregateInput
    _min?: RefreshTokenMinOrderByAggregateInput
  }

  export type RefreshTokenScalarWhereWithAggregatesInput = {
    AND?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    OR?: RefreshTokenScalarWhereWithAggregatesInput[]
    NOT?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RefreshToken"> | string
    userId?: StringWithAggregatesFilter<"RefreshToken"> | string
    tokenHash?: StringWithAggregatesFilter<"RefreshToken"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    revokedAt?: DateTimeNullableWithAggregatesFilter<"RefreshToken"> | Date | string | null
  }

  export type InvoiceWhereInput = {
    AND?: InvoiceWhereInput | InvoiceWhereInput[]
    OR?: InvoiceWhereInput[]
    NOT?: InvoiceWhereInput | InvoiceWhereInput[]
    id?: StringFilter<"Invoice"> | string
    documentType?: StringFilter<"Invoice"> | string
    documentNumber?: StringFilter<"Invoice"> | string
    invoiceDate?: DateTimeFilter<"Invoice"> | Date | string
    dueDate?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    deliveryDate?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    dispatchDate?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    paymentDate?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    signatureDate?: StringNullableFilter<"Invoice"> | string | null
    otherDate?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    periodStart?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    periodEnd?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    operationNature?: StringFilter<"Invoice"> | string
    currency?: StringFilter<"Invoice"> | string
    orderReference?: StringNullableFilter<"Invoice"> | string | null
    contractReference?: StringNullableFilter<"Invoice"> | string | null
    deliveryNoteReference?: StringNullableFilter<"Invoice"> | string | null
    userId?: StringFilter<"Invoice"> | string
    supplierId?: StringFilter<"Invoice"> | string
    buyerId?: StringFilter<"Invoice"> | string
    globalDiscount?: FloatFilter<"Invoice"> | number
    stampDuty?: FloatFilter<"Invoice"> | number
    ttnReference?: StringNullableFilter<"Invoice"> | string | null
    paymentMeans?: StringFilter<"Invoice"> | string
    bankName?: StringNullableFilter<"Invoice"> | string | null
    bankCode?: StringNullableFilter<"Invoice"> | string | null
    bankRib?: StringNullableFilter<"Invoice"> | string | null
    bankAccountOwner?: StringNullableFilter<"Invoice"> | string | null
    checkNumber?: StringNullableFilter<"Invoice"> | string | null
    cardType?: StringNullableFilter<"Invoice"> | string | null
    cardLast4?: StringNullableFilter<"Invoice"> | string | null
    cardReference?: StringNullableFilter<"Invoice"> | string | null
    postalAccountNumber?: StringNullableFilter<"Invoice"> | string | null
    postalAccountOwner?: StringNullableFilter<"Invoice"> | string | null
    postalBranchCode?: StringNullableFilter<"Invoice"> | string | null
    postalServiceName?: StringNullableFilter<"Invoice"> | string | null
    ePaymentGateway?: StringNullableFilter<"Invoice"> | string | null
    ePaymentTransactionId?: StringNullableFilter<"Invoice"> | string | null
    otherPaymentDescription?: StringNullableFilter<"Invoice"> | string | null
    otherPaymentReference?: StringNullableFilter<"Invoice"> | string | null
    ircRate?: FloatNullableFilter<"Invoice"> | number | null
    ircAmount?: FloatNullableFilter<"Invoice"> | number | null
    ircExemptionReason?: StringNullableFilter<"Invoice"> | string | null
    qrCodeEnabled?: BoolFilter<"Invoice"> | boolean
    qrCodeContent?: StringNullableFilter<"Invoice"> | string | null
    amountDescriptionOverride?: StringNullableFilter<"Invoice"> | string | null
    amountLanguage?: StringFilter<"Invoice"> | string
    xmlContent?: StringFilter<"Invoice"> | string
    status?: StringFilter<"Invoice"> | string
    totalHT?: FloatFilter<"Invoice"> | number
    totalTVA?: FloatFilter<"Invoice"> | number
    totalTTC?: FloatFilter<"Invoice"> | number
    deletedAt?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    metadata?: JsonNullableFilter<"Invoice">
    createdAt?: DateTimeFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeFilter<"Invoice"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    supplier?: XOR<PartnerRelationFilter, PartnerWhereInput>
    buyer?: XOR<PartnerRelationFilter, PartnerWhereInput>
    lines?: InvoiceLineListRelationFilter
    allowances?: AllowanceChargeListRelationFilter
  }

  export type InvoiceOrderByWithRelationInput = {
    id?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    invoiceDate?: SortOrder
    dueDate?: SortOrderInput | SortOrder
    deliveryDate?: SortOrderInput | SortOrder
    dispatchDate?: SortOrderInput | SortOrder
    paymentDate?: SortOrderInput | SortOrder
    signatureDate?: SortOrderInput | SortOrder
    otherDate?: SortOrderInput | SortOrder
    periodStart?: SortOrderInput | SortOrder
    periodEnd?: SortOrderInput | SortOrder
    operationNature?: SortOrder
    currency?: SortOrder
    orderReference?: SortOrderInput | SortOrder
    contractReference?: SortOrderInput | SortOrder
    deliveryNoteReference?: SortOrderInput | SortOrder
    userId?: SortOrder
    supplierId?: SortOrder
    buyerId?: SortOrder
    globalDiscount?: SortOrder
    stampDuty?: SortOrder
    ttnReference?: SortOrderInput | SortOrder
    paymentMeans?: SortOrder
    bankName?: SortOrderInput | SortOrder
    bankCode?: SortOrderInput | SortOrder
    bankRib?: SortOrderInput | SortOrder
    bankAccountOwner?: SortOrderInput | SortOrder
    checkNumber?: SortOrderInput | SortOrder
    cardType?: SortOrderInput | SortOrder
    cardLast4?: SortOrderInput | SortOrder
    cardReference?: SortOrderInput | SortOrder
    postalAccountNumber?: SortOrderInput | SortOrder
    postalAccountOwner?: SortOrderInput | SortOrder
    postalBranchCode?: SortOrderInput | SortOrder
    postalServiceName?: SortOrderInput | SortOrder
    ePaymentGateway?: SortOrderInput | SortOrder
    ePaymentTransactionId?: SortOrderInput | SortOrder
    otherPaymentDescription?: SortOrderInput | SortOrder
    otherPaymentReference?: SortOrderInput | SortOrder
    ircRate?: SortOrderInput | SortOrder
    ircAmount?: SortOrderInput | SortOrder
    ircExemptionReason?: SortOrderInput | SortOrder
    qrCodeEnabled?: SortOrder
    qrCodeContent?: SortOrderInput | SortOrder
    amountDescriptionOverride?: SortOrderInput | SortOrder
    amountLanguage?: SortOrder
    xmlContent?: SortOrder
    status?: SortOrder
    totalHT?: SortOrder
    totalTVA?: SortOrder
    totalTTC?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    supplier?: PartnerOrderByWithRelationInput
    buyer?: PartnerOrderByWithRelationInput
    lines?: InvoiceLineOrderByRelationAggregateInput
    allowances?: AllowanceChargeOrderByRelationAggregateInput
  }

  export type InvoiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    documentNumber?: string
    AND?: InvoiceWhereInput | InvoiceWhereInput[]
    OR?: InvoiceWhereInput[]
    NOT?: InvoiceWhereInput | InvoiceWhereInput[]
    documentType?: StringFilter<"Invoice"> | string
    invoiceDate?: DateTimeFilter<"Invoice"> | Date | string
    dueDate?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    deliveryDate?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    dispatchDate?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    paymentDate?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    signatureDate?: StringNullableFilter<"Invoice"> | string | null
    otherDate?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    periodStart?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    periodEnd?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    operationNature?: StringFilter<"Invoice"> | string
    currency?: StringFilter<"Invoice"> | string
    orderReference?: StringNullableFilter<"Invoice"> | string | null
    contractReference?: StringNullableFilter<"Invoice"> | string | null
    deliveryNoteReference?: StringNullableFilter<"Invoice"> | string | null
    userId?: StringFilter<"Invoice"> | string
    supplierId?: StringFilter<"Invoice"> | string
    buyerId?: StringFilter<"Invoice"> | string
    globalDiscount?: FloatFilter<"Invoice"> | number
    stampDuty?: FloatFilter<"Invoice"> | number
    ttnReference?: StringNullableFilter<"Invoice"> | string | null
    paymentMeans?: StringFilter<"Invoice"> | string
    bankName?: StringNullableFilter<"Invoice"> | string | null
    bankCode?: StringNullableFilter<"Invoice"> | string | null
    bankRib?: StringNullableFilter<"Invoice"> | string | null
    bankAccountOwner?: StringNullableFilter<"Invoice"> | string | null
    checkNumber?: StringNullableFilter<"Invoice"> | string | null
    cardType?: StringNullableFilter<"Invoice"> | string | null
    cardLast4?: StringNullableFilter<"Invoice"> | string | null
    cardReference?: StringNullableFilter<"Invoice"> | string | null
    postalAccountNumber?: StringNullableFilter<"Invoice"> | string | null
    postalAccountOwner?: StringNullableFilter<"Invoice"> | string | null
    postalBranchCode?: StringNullableFilter<"Invoice"> | string | null
    postalServiceName?: StringNullableFilter<"Invoice"> | string | null
    ePaymentGateway?: StringNullableFilter<"Invoice"> | string | null
    ePaymentTransactionId?: StringNullableFilter<"Invoice"> | string | null
    otherPaymentDescription?: StringNullableFilter<"Invoice"> | string | null
    otherPaymentReference?: StringNullableFilter<"Invoice"> | string | null
    ircRate?: FloatNullableFilter<"Invoice"> | number | null
    ircAmount?: FloatNullableFilter<"Invoice"> | number | null
    ircExemptionReason?: StringNullableFilter<"Invoice"> | string | null
    qrCodeEnabled?: BoolFilter<"Invoice"> | boolean
    qrCodeContent?: StringNullableFilter<"Invoice"> | string | null
    amountDescriptionOverride?: StringNullableFilter<"Invoice"> | string | null
    amountLanguage?: StringFilter<"Invoice"> | string
    xmlContent?: StringFilter<"Invoice"> | string
    status?: StringFilter<"Invoice"> | string
    totalHT?: FloatFilter<"Invoice"> | number
    totalTVA?: FloatFilter<"Invoice"> | number
    totalTTC?: FloatFilter<"Invoice"> | number
    deletedAt?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    metadata?: JsonNullableFilter<"Invoice">
    createdAt?: DateTimeFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeFilter<"Invoice"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    supplier?: XOR<PartnerRelationFilter, PartnerWhereInput>
    buyer?: XOR<PartnerRelationFilter, PartnerWhereInput>
    lines?: InvoiceLineListRelationFilter
    allowances?: AllowanceChargeListRelationFilter
  }, "id" | "documentNumber">

  export type InvoiceOrderByWithAggregationInput = {
    id?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    invoiceDate?: SortOrder
    dueDate?: SortOrderInput | SortOrder
    deliveryDate?: SortOrderInput | SortOrder
    dispatchDate?: SortOrderInput | SortOrder
    paymentDate?: SortOrderInput | SortOrder
    signatureDate?: SortOrderInput | SortOrder
    otherDate?: SortOrderInput | SortOrder
    periodStart?: SortOrderInput | SortOrder
    periodEnd?: SortOrderInput | SortOrder
    operationNature?: SortOrder
    currency?: SortOrder
    orderReference?: SortOrderInput | SortOrder
    contractReference?: SortOrderInput | SortOrder
    deliveryNoteReference?: SortOrderInput | SortOrder
    userId?: SortOrder
    supplierId?: SortOrder
    buyerId?: SortOrder
    globalDiscount?: SortOrder
    stampDuty?: SortOrder
    ttnReference?: SortOrderInput | SortOrder
    paymentMeans?: SortOrder
    bankName?: SortOrderInput | SortOrder
    bankCode?: SortOrderInput | SortOrder
    bankRib?: SortOrderInput | SortOrder
    bankAccountOwner?: SortOrderInput | SortOrder
    checkNumber?: SortOrderInput | SortOrder
    cardType?: SortOrderInput | SortOrder
    cardLast4?: SortOrderInput | SortOrder
    cardReference?: SortOrderInput | SortOrder
    postalAccountNumber?: SortOrderInput | SortOrder
    postalAccountOwner?: SortOrderInput | SortOrder
    postalBranchCode?: SortOrderInput | SortOrder
    postalServiceName?: SortOrderInput | SortOrder
    ePaymentGateway?: SortOrderInput | SortOrder
    ePaymentTransactionId?: SortOrderInput | SortOrder
    otherPaymentDescription?: SortOrderInput | SortOrder
    otherPaymentReference?: SortOrderInput | SortOrder
    ircRate?: SortOrderInput | SortOrder
    ircAmount?: SortOrderInput | SortOrder
    ircExemptionReason?: SortOrderInput | SortOrder
    qrCodeEnabled?: SortOrder
    qrCodeContent?: SortOrderInput | SortOrder
    amountDescriptionOverride?: SortOrderInput | SortOrder
    amountLanguage?: SortOrder
    xmlContent?: SortOrder
    status?: SortOrder
    totalHT?: SortOrder
    totalTVA?: SortOrder
    totalTTC?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InvoiceCountOrderByAggregateInput
    _avg?: InvoiceAvgOrderByAggregateInput
    _max?: InvoiceMaxOrderByAggregateInput
    _min?: InvoiceMinOrderByAggregateInput
    _sum?: InvoiceSumOrderByAggregateInput
  }

  export type InvoiceScalarWhereWithAggregatesInput = {
    AND?: InvoiceScalarWhereWithAggregatesInput | InvoiceScalarWhereWithAggregatesInput[]
    OR?: InvoiceScalarWhereWithAggregatesInput[]
    NOT?: InvoiceScalarWhereWithAggregatesInput | InvoiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Invoice"> | string
    documentType?: StringWithAggregatesFilter<"Invoice"> | string
    documentNumber?: StringWithAggregatesFilter<"Invoice"> | string
    invoiceDate?: DateTimeWithAggregatesFilter<"Invoice"> | Date | string
    dueDate?: DateTimeNullableWithAggregatesFilter<"Invoice"> | Date | string | null
    deliveryDate?: DateTimeNullableWithAggregatesFilter<"Invoice"> | Date | string | null
    dispatchDate?: DateTimeNullableWithAggregatesFilter<"Invoice"> | Date | string | null
    paymentDate?: DateTimeNullableWithAggregatesFilter<"Invoice"> | Date | string | null
    signatureDate?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    otherDate?: DateTimeNullableWithAggregatesFilter<"Invoice"> | Date | string | null
    periodStart?: DateTimeNullableWithAggregatesFilter<"Invoice"> | Date | string | null
    periodEnd?: DateTimeNullableWithAggregatesFilter<"Invoice"> | Date | string | null
    operationNature?: StringWithAggregatesFilter<"Invoice"> | string
    currency?: StringWithAggregatesFilter<"Invoice"> | string
    orderReference?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    contractReference?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    deliveryNoteReference?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    userId?: StringWithAggregatesFilter<"Invoice"> | string
    supplierId?: StringWithAggregatesFilter<"Invoice"> | string
    buyerId?: StringWithAggregatesFilter<"Invoice"> | string
    globalDiscount?: FloatWithAggregatesFilter<"Invoice"> | number
    stampDuty?: FloatWithAggregatesFilter<"Invoice"> | number
    ttnReference?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    paymentMeans?: StringWithAggregatesFilter<"Invoice"> | string
    bankName?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    bankCode?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    bankRib?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    bankAccountOwner?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    checkNumber?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    cardType?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    cardLast4?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    cardReference?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    postalAccountNumber?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    postalAccountOwner?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    postalBranchCode?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    postalServiceName?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    ePaymentGateway?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    ePaymentTransactionId?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    otherPaymentDescription?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    otherPaymentReference?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    ircRate?: FloatNullableWithAggregatesFilter<"Invoice"> | number | null
    ircAmount?: FloatNullableWithAggregatesFilter<"Invoice"> | number | null
    ircExemptionReason?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    qrCodeEnabled?: BoolWithAggregatesFilter<"Invoice"> | boolean
    qrCodeContent?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    amountDescriptionOverride?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    amountLanguage?: StringWithAggregatesFilter<"Invoice"> | string
    xmlContent?: StringWithAggregatesFilter<"Invoice"> | string
    status?: StringWithAggregatesFilter<"Invoice"> | string
    totalHT?: FloatWithAggregatesFilter<"Invoice"> | number
    totalTVA?: FloatWithAggregatesFilter<"Invoice"> | number
    totalTTC?: FloatWithAggregatesFilter<"Invoice"> | number
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Invoice"> | Date | string | null
    metadata?: JsonNullableWithAggregatesFilter<"Invoice">
    createdAt?: DateTimeWithAggregatesFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Invoice"> | Date | string
  }

  export type PartnerWhereInput = {
    AND?: PartnerWhereInput | PartnerWhereInput[]
    OR?: PartnerWhereInput[]
    NOT?: PartnerWhereInput | PartnerWhereInput[]
    id?: StringFilter<"Partner"> | string
    idType?: StringFilter<"Partner"> | string
    idValue?: StringFilter<"Partner"> | string
    name?: StringFilter<"Partner"> | string
    addressDescription?: StringNullableFilter<"Partner"> | string | null
    street?: StringFilter<"Partner"> | string
    city?: StringFilter<"Partner"> | string
    postalCode?: StringFilter<"Partner"> | string
    country?: StringFilter<"Partner"> | string
    rc?: StringNullableFilter<"Partner"> | string | null
    capital?: StringNullableFilter<"Partner"> | string | null
    phone?: StringNullableFilter<"Partner"> | string | null
    email?: StringNullableFilter<"Partner"> | string | null
    partnerType?: StringNullableFilter<"Partner"> | string | null
    createdAt?: DateTimeFilter<"Partner"> | Date | string
    updatedAt?: DateTimeFilter<"Partner"> | Date | string
    supplierInvoices?: InvoiceListRelationFilter
    buyerInvoices?: InvoiceListRelationFilter
  }

  export type PartnerOrderByWithRelationInput = {
    id?: SortOrder
    idType?: SortOrder
    idValue?: SortOrder
    name?: SortOrder
    addressDescription?: SortOrderInput | SortOrder
    street?: SortOrder
    city?: SortOrder
    postalCode?: SortOrder
    country?: SortOrder
    rc?: SortOrderInput | SortOrder
    capital?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    partnerType?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    supplierInvoices?: InvoiceOrderByRelationAggregateInput
    buyerInvoices?: InvoiceOrderByRelationAggregateInput
  }

  export type PartnerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    idType_idValue?: PartnerIdTypeIdValueCompoundUniqueInput
    AND?: PartnerWhereInput | PartnerWhereInput[]
    OR?: PartnerWhereInput[]
    NOT?: PartnerWhereInput | PartnerWhereInput[]
    idType?: StringFilter<"Partner"> | string
    idValue?: StringFilter<"Partner"> | string
    name?: StringFilter<"Partner"> | string
    addressDescription?: StringNullableFilter<"Partner"> | string | null
    street?: StringFilter<"Partner"> | string
    city?: StringFilter<"Partner"> | string
    postalCode?: StringFilter<"Partner"> | string
    country?: StringFilter<"Partner"> | string
    rc?: StringNullableFilter<"Partner"> | string | null
    capital?: StringNullableFilter<"Partner"> | string | null
    phone?: StringNullableFilter<"Partner"> | string | null
    email?: StringNullableFilter<"Partner"> | string | null
    partnerType?: StringNullableFilter<"Partner"> | string | null
    createdAt?: DateTimeFilter<"Partner"> | Date | string
    updatedAt?: DateTimeFilter<"Partner"> | Date | string
    supplierInvoices?: InvoiceListRelationFilter
    buyerInvoices?: InvoiceListRelationFilter
  }, "id" | "idType_idValue">

  export type PartnerOrderByWithAggregationInput = {
    id?: SortOrder
    idType?: SortOrder
    idValue?: SortOrder
    name?: SortOrder
    addressDescription?: SortOrderInput | SortOrder
    street?: SortOrder
    city?: SortOrder
    postalCode?: SortOrder
    country?: SortOrder
    rc?: SortOrderInput | SortOrder
    capital?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    partnerType?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PartnerCountOrderByAggregateInput
    _max?: PartnerMaxOrderByAggregateInput
    _min?: PartnerMinOrderByAggregateInput
  }

  export type PartnerScalarWhereWithAggregatesInput = {
    AND?: PartnerScalarWhereWithAggregatesInput | PartnerScalarWhereWithAggregatesInput[]
    OR?: PartnerScalarWhereWithAggregatesInput[]
    NOT?: PartnerScalarWhereWithAggregatesInput | PartnerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Partner"> | string
    idType?: StringWithAggregatesFilter<"Partner"> | string
    idValue?: StringWithAggregatesFilter<"Partner"> | string
    name?: StringWithAggregatesFilter<"Partner"> | string
    addressDescription?: StringNullableWithAggregatesFilter<"Partner"> | string | null
    street?: StringWithAggregatesFilter<"Partner"> | string
    city?: StringWithAggregatesFilter<"Partner"> | string
    postalCode?: StringWithAggregatesFilter<"Partner"> | string
    country?: StringWithAggregatesFilter<"Partner"> | string
    rc?: StringNullableWithAggregatesFilter<"Partner"> | string | null
    capital?: StringNullableWithAggregatesFilter<"Partner"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Partner"> | string | null
    email?: StringNullableWithAggregatesFilter<"Partner"> | string | null
    partnerType?: StringNullableWithAggregatesFilter<"Partner"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Partner"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Partner"> | Date | string
  }

  export type InvoiceLineWhereInput = {
    AND?: InvoiceLineWhereInput | InvoiceLineWhereInput[]
    OR?: InvoiceLineWhereInput[]
    NOT?: InvoiceLineWhereInput | InvoiceLineWhereInput[]
    id?: StringFilter<"InvoiceLine"> | string
    invoiceId?: StringFilter<"InvoiceLine"> | string
    itemCode?: StringFilter<"InvoiceLine"> | string
    description?: StringFilter<"InvoiceLine"> | string
    quantity?: FloatFilter<"InvoiceLine"> | number
    unit?: StringFilter<"InvoiceLine"> | string
    unitPrice?: FloatFilter<"InvoiceLine"> | number
    discountRate?: FloatFilter<"InvoiceLine"> | number
    taxRate?: FloatFilter<"InvoiceLine"> | number
    fodec?: BoolFilter<"InvoiceLine"> | boolean
    exemptionReason?: StringNullableFilter<"InvoiceLine"> | string | null
    lineAmount?: FloatFilter<"InvoiceLine"> | number
    taxAmount?: FloatFilter<"InvoiceLine"> | number
    totalAmount?: FloatFilter<"InvoiceLine"> | number
    createdAt?: DateTimeFilter<"InvoiceLine"> | Date | string
    updatedAt?: DateTimeFilter<"InvoiceLine"> | Date | string
    invoice?: XOR<InvoiceRelationFilter, InvoiceWhereInput>
    allowances?: AllowanceChargeListRelationFilter
  }

  export type InvoiceLineOrderByWithRelationInput = {
    id?: SortOrder
    invoiceId?: SortOrder
    itemCode?: SortOrder
    description?: SortOrder
    quantity?: SortOrder
    unit?: SortOrder
    unitPrice?: SortOrder
    discountRate?: SortOrder
    taxRate?: SortOrder
    fodec?: SortOrder
    exemptionReason?: SortOrderInput | SortOrder
    lineAmount?: SortOrder
    taxAmount?: SortOrder
    totalAmount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    invoice?: InvoiceOrderByWithRelationInput
    allowances?: AllowanceChargeOrderByRelationAggregateInput
  }

  export type InvoiceLineWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InvoiceLineWhereInput | InvoiceLineWhereInput[]
    OR?: InvoiceLineWhereInput[]
    NOT?: InvoiceLineWhereInput | InvoiceLineWhereInput[]
    invoiceId?: StringFilter<"InvoiceLine"> | string
    itemCode?: StringFilter<"InvoiceLine"> | string
    description?: StringFilter<"InvoiceLine"> | string
    quantity?: FloatFilter<"InvoiceLine"> | number
    unit?: StringFilter<"InvoiceLine"> | string
    unitPrice?: FloatFilter<"InvoiceLine"> | number
    discountRate?: FloatFilter<"InvoiceLine"> | number
    taxRate?: FloatFilter<"InvoiceLine"> | number
    fodec?: BoolFilter<"InvoiceLine"> | boolean
    exemptionReason?: StringNullableFilter<"InvoiceLine"> | string | null
    lineAmount?: FloatFilter<"InvoiceLine"> | number
    taxAmount?: FloatFilter<"InvoiceLine"> | number
    totalAmount?: FloatFilter<"InvoiceLine"> | number
    createdAt?: DateTimeFilter<"InvoiceLine"> | Date | string
    updatedAt?: DateTimeFilter<"InvoiceLine"> | Date | string
    invoice?: XOR<InvoiceRelationFilter, InvoiceWhereInput>
    allowances?: AllowanceChargeListRelationFilter
  }, "id">

  export type InvoiceLineOrderByWithAggregationInput = {
    id?: SortOrder
    invoiceId?: SortOrder
    itemCode?: SortOrder
    description?: SortOrder
    quantity?: SortOrder
    unit?: SortOrder
    unitPrice?: SortOrder
    discountRate?: SortOrder
    taxRate?: SortOrder
    fodec?: SortOrder
    exemptionReason?: SortOrderInput | SortOrder
    lineAmount?: SortOrder
    taxAmount?: SortOrder
    totalAmount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InvoiceLineCountOrderByAggregateInput
    _avg?: InvoiceLineAvgOrderByAggregateInput
    _max?: InvoiceLineMaxOrderByAggregateInput
    _min?: InvoiceLineMinOrderByAggregateInput
    _sum?: InvoiceLineSumOrderByAggregateInput
  }

  export type InvoiceLineScalarWhereWithAggregatesInput = {
    AND?: InvoiceLineScalarWhereWithAggregatesInput | InvoiceLineScalarWhereWithAggregatesInput[]
    OR?: InvoiceLineScalarWhereWithAggregatesInput[]
    NOT?: InvoiceLineScalarWhereWithAggregatesInput | InvoiceLineScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"InvoiceLine"> | string
    invoiceId?: StringWithAggregatesFilter<"InvoiceLine"> | string
    itemCode?: StringWithAggregatesFilter<"InvoiceLine"> | string
    description?: StringWithAggregatesFilter<"InvoiceLine"> | string
    quantity?: FloatWithAggregatesFilter<"InvoiceLine"> | number
    unit?: StringWithAggregatesFilter<"InvoiceLine"> | string
    unitPrice?: FloatWithAggregatesFilter<"InvoiceLine"> | number
    discountRate?: FloatWithAggregatesFilter<"InvoiceLine"> | number
    taxRate?: FloatWithAggregatesFilter<"InvoiceLine"> | number
    fodec?: BoolWithAggregatesFilter<"InvoiceLine"> | boolean
    exemptionReason?: StringNullableWithAggregatesFilter<"InvoiceLine"> | string | null
    lineAmount?: FloatWithAggregatesFilter<"InvoiceLine"> | number
    taxAmount?: FloatWithAggregatesFilter<"InvoiceLine"> | number
    totalAmount?: FloatWithAggregatesFilter<"InvoiceLine"> | number
    createdAt?: DateTimeWithAggregatesFilter<"InvoiceLine"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"InvoiceLine"> | Date | string
  }

  export type AllowanceChargeWhereInput = {
    AND?: AllowanceChargeWhereInput | AllowanceChargeWhereInput[]
    OR?: AllowanceChargeWhereInput[]
    NOT?: AllowanceChargeWhereInput | AllowanceChargeWhereInput[]
    id?: StringFilter<"AllowanceCharge"> | string
    type?: StringFilter<"AllowanceCharge"> | string
    code?: StringFilter<"AllowanceCharge"> | string
    description?: StringFilter<"AllowanceCharge"> | string
    amount?: FloatFilter<"AllowanceCharge"> | number
    basedOn?: StringNullableFilter<"AllowanceCharge"> | string | null
    invoiceId?: StringNullableFilter<"AllowanceCharge"> | string | null
    lineId?: StringNullableFilter<"AllowanceCharge"> | string | null
    createdAt?: DateTimeFilter<"AllowanceCharge"> | Date | string
    updatedAt?: DateTimeFilter<"AllowanceCharge"> | Date | string
    invoice?: XOR<InvoiceNullableRelationFilter, InvoiceWhereInput> | null
    line?: XOR<InvoiceLineNullableRelationFilter, InvoiceLineWhereInput> | null
  }

  export type AllowanceChargeOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    code?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    basedOn?: SortOrderInput | SortOrder
    invoiceId?: SortOrderInput | SortOrder
    lineId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    invoice?: InvoiceOrderByWithRelationInput
    line?: InvoiceLineOrderByWithRelationInput
  }

  export type AllowanceChargeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AllowanceChargeWhereInput | AllowanceChargeWhereInput[]
    OR?: AllowanceChargeWhereInput[]
    NOT?: AllowanceChargeWhereInput | AllowanceChargeWhereInput[]
    type?: StringFilter<"AllowanceCharge"> | string
    code?: StringFilter<"AllowanceCharge"> | string
    description?: StringFilter<"AllowanceCharge"> | string
    amount?: FloatFilter<"AllowanceCharge"> | number
    basedOn?: StringNullableFilter<"AllowanceCharge"> | string | null
    invoiceId?: StringNullableFilter<"AllowanceCharge"> | string | null
    lineId?: StringNullableFilter<"AllowanceCharge"> | string | null
    createdAt?: DateTimeFilter<"AllowanceCharge"> | Date | string
    updatedAt?: DateTimeFilter<"AllowanceCharge"> | Date | string
    invoice?: XOR<InvoiceNullableRelationFilter, InvoiceWhereInput> | null
    line?: XOR<InvoiceLineNullableRelationFilter, InvoiceLineWhereInput> | null
  }, "id">

  export type AllowanceChargeOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    code?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    basedOn?: SortOrderInput | SortOrder
    invoiceId?: SortOrderInput | SortOrder
    lineId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AllowanceChargeCountOrderByAggregateInput
    _avg?: AllowanceChargeAvgOrderByAggregateInput
    _max?: AllowanceChargeMaxOrderByAggregateInput
    _min?: AllowanceChargeMinOrderByAggregateInput
    _sum?: AllowanceChargeSumOrderByAggregateInput
  }

  export type AllowanceChargeScalarWhereWithAggregatesInput = {
    AND?: AllowanceChargeScalarWhereWithAggregatesInput | AllowanceChargeScalarWhereWithAggregatesInput[]
    OR?: AllowanceChargeScalarWhereWithAggregatesInput[]
    NOT?: AllowanceChargeScalarWhereWithAggregatesInput | AllowanceChargeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AllowanceCharge"> | string
    type?: StringWithAggregatesFilter<"AllowanceCharge"> | string
    code?: StringWithAggregatesFilter<"AllowanceCharge"> | string
    description?: StringWithAggregatesFilter<"AllowanceCharge"> | string
    amount?: FloatWithAggregatesFilter<"AllowanceCharge"> | number
    basedOn?: StringNullableWithAggregatesFilter<"AllowanceCharge"> | string | null
    invoiceId?: StringNullableWithAggregatesFilter<"AllowanceCharge"> | string | null
    lineId?: StringNullableWithAggregatesFilter<"AllowanceCharge"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AllowanceCharge"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AllowanceCharge"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name: string
    passwordHash: string
    emailVerified?: boolean
    verificationCode?: string | null
    verificationCodeExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoices?: InvoiceCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    signature?: UserSignatureCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name: string
    passwordHash: string
    emailVerified?: boolean
    verificationCode?: string | null
    verificationCodeExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoices?: InvoiceUncheckedCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    signature?: UserSignatureUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    verificationCodeExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoices?: InvoiceUpdateManyWithoutUserNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    signature?: UserSignatureUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    verificationCodeExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoices?: InvoiceUncheckedUpdateManyWithoutUserNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    signature?: UserSignatureUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name: string
    passwordHash: string
    emailVerified?: boolean
    verificationCode?: string | null
    verificationCodeExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    verificationCodeExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    verificationCodeExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSignatureCreateInput = {
    id?: string
    certificateFilename: string
    encryptedContent: string
    signaturePinHash: string
    certificateSubject?: string | null
    certificateIssuer?: string | null
    certificateSerialNumber?: string | null
    certificateValidFrom?: Date | string | null
    certificateValidUntil?: Date | string | null
    keyAlgorithm?: string | null
    status?: string
    uploadedAt?: Date | string
    lastUsedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSignatureInput
  }

  export type UserSignatureUncheckedCreateInput = {
    id?: string
    userId: string
    certificateFilename: string
    encryptedContent: string
    signaturePinHash: string
    certificateSubject?: string | null
    certificateIssuer?: string | null
    certificateSerialNumber?: string | null
    certificateValidFrom?: Date | string | null
    certificateValidUntil?: Date | string | null
    keyAlgorithm?: string | null
    status?: string
    uploadedAt?: Date | string
    lastUsedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSignatureUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    certificateFilename?: StringFieldUpdateOperationsInput | string
    encryptedContent?: StringFieldUpdateOperationsInput | string
    signaturePinHash?: StringFieldUpdateOperationsInput | string
    certificateSubject?: NullableStringFieldUpdateOperationsInput | string | null
    certificateIssuer?: NullableStringFieldUpdateOperationsInput | string | null
    certificateSerialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    certificateValidFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    certificateValidUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    keyAlgorithm?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSignatureNestedInput
  }

  export type UserSignatureUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    certificateFilename?: StringFieldUpdateOperationsInput | string
    encryptedContent?: StringFieldUpdateOperationsInput | string
    signaturePinHash?: StringFieldUpdateOperationsInput | string
    certificateSubject?: NullableStringFieldUpdateOperationsInput | string | null
    certificateIssuer?: NullableStringFieldUpdateOperationsInput | string | null
    certificateSerialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    certificateValidFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    certificateValidUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    keyAlgorithm?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSignatureCreateManyInput = {
    id?: string
    userId: string
    certificateFilename: string
    encryptedContent: string
    signaturePinHash: string
    certificateSubject?: string | null
    certificateIssuer?: string | null
    certificateSerialNumber?: string | null
    certificateValidFrom?: Date | string | null
    certificateValidUntil?: Date | string | null
    keyAlgorithm?: string | null
    status?: string
    uploadedAt?: Date | string
    lastUsedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSignatureUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    certificateFilename?: StringFieldUpdateOperationsInput | string
    encryptedContent?: StringFieldUpdateOperationsInput | string
    signaturePinHash?: StringFieldUpdateOperationsInput | string
    certificateSubject?: NullableStringFieldUpdateOperationsInput | string | null
    certificateIssuer?: NullableStringFieldUpdateOperationsInput | string | null
    certificateSerialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    certificateValidFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    certificateValidUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    keyAlgorithm?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSignatureUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    certificateFilename?: StringFieldUpdateOperationsInput | string
    encryptedContent?: StringFieldUpdateOperationsInput | string
    signaturePinHash?: StringFieldUpdateOperationsInput | string
    certificateSubject?: NullableStringFieldUpdateOperationsInput | string | null
    certificateIssuer?: NullableStringFieldUpdateOperationsInput | string | null
    certificateSerialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    certificateValidFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    certificateValidUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    keyAlgorithm?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SignatureAuditCreateInput = {
    id?: string
    userId: string
    action: string
    invoiceId?: string | null
    documentNumber?: string | null
    status: string
    errorMessage?: string | null
    certificateUsed?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type SignatureAuditUncheckedCreateInput = {
    id?: string
    userId: string
    action: string
    invoiceId?: string | null
    documentNumber?: string | null
    status: string
    errorMessage?: string | null
    certificateUsed?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type SignatureAuditUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    certificateUsed?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SignatureAuditUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    certificateUsed?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SignatureAuditCreateManyInput = {
    id?: string
    userId: string
    action: string
    invoiceId?: string | null
    documentNumber?: string | null
    status: string
    errorMessage?: string | null
    certificateUsed?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type SignatureAuditUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    certificateUsed?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SignatureAuditUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    certificateUsed?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateInput = {
    id?: string
    tokenHash: string
    expiresAt: Date | string
    createdAt?: Date | string
    revokedAt?: Date | string | null
    user: UserCreateNestedOneWithoutRefreshTokensInput
  }

  export type RefreshTokenUncheckedCreateInput = {
    id?: string
    userId: string
    tokenHash: string
    expiresAt: Date | string
    createdAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type RefreshTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutRefreshTokensNestedInput
  }

  export type RefreshTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RefreshTokenCreateManyInput = {
    id?: string
    userId: string
    tokenHash: string
    expiresAt: Date | string
    createdAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type RefreshTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RefreshTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InvoiceCreateInput = {
    id?: string
    documentType: string
    documentNumber: string
    invoiceDate: Date | string
    dueDate?: Date | string | null
    deliveryDate?: Date | string | null
    dispatchDate?: Date | string | null
    paymentDate?: Date | string | null
    signatureDate?: string | null
    otherDate?: Date | string | null
    periodStart?: Date | string | null
    periodEnd?: Date | string | null
    operationNature: string
    currency?: string
    orderReference?: string | null
    contractReference?: string | null
    deliveryNoteReference?: string | null
    globalDiscount?: number
    stampDuty?: number
    ttnReference?: string | null
    paymentMeans: string
    bankName?: string | null
    bankCode?: string | null
    bankRib?: string | null
    bankAccountOwner?: string | null
    checkNumber?: string | null
    cardType?: string | null
    cardLast4?: string | null
    cardReference?: string | null
    postalAccountNumber?: string | null
    postalAccountOwner?: string | null
    postalBranchCode?: string | null
    postalServiceName?: string | null
    ePaymentGateway?: string | null
    ePaymentTransactionId?: string | null
    otherPaymentDescription?: string | null
    otherPaymentReference?: string | null
    ircRate?: number | null
    ircAmount?: number | null
    ircExemptionReason?: string | null
    qrCodeEnabled?: boolean
    qrCodeContent?: string | null
    amountDescriptionOverride?: string | null
    amountLanguage?: string
    xmlContent: string
    status?: string
    totalHT?: number
    totalTVA?: number
    totalTTC?: number
    deletedAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutInvoicesInput
    supplier: PartnerCreateNestedOneWithoutSupplierInvoicesInput
    buyer: PartnerCreateNestedOneWithoutBuyerInvoicesInput
    lines?: InvoiceLineCreateNestedManyWithoutInvoiceInput
    allowances?: AllowanceChargeCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceUncheckedCreateInput = {
    id?: string
    documentType: string
    documentNumber: string
    invoiceDate: Date | string
    dueDate?: Date | string | null
    deliveryDate?: Date | string | null
    dispatchDate?: Date | string | null
    paymentDate?: Date | string | null
    signatureDate?: string | null
    otherDate?: Date | string | null
    periodStart?: Date | string | null
    periodEnd?: Date | string | null
    operationNature: string
    currency?: string
    orderReference?: string | null
    contractReference?: string | null
    deliveryNoteReference?: string | null
    userId: string
    supplierId: string
    buyerId: string
    globalDiscount?: number
    stampDuty?: number
    ttnReference?: string | null
    paymentMeans: string
    bankName?: string | null
    bankCode?: string | null
    bankRib?: string | null
    bankAccountOwner?: string | null
    checkNumber?: string | null
    cardType?: string | null
    cardLast4?: string | null
    cardReference?: string | null
    postalAccountNumber?: string | null
    postalAccountOwner?: string | null
    postalBranchCode?: string | null
    postalServiceName?: string | null
    ePaymentGateway?: string | null
    ePaymentTransactionId?: string | null
    otherPaymentDescription?: string | null
    otherPaymentReference?: string | null
    ircRate?: number | null
    ircAmount?: number | null
    ircExemptionReason?: string | null
    qrCodeEnabled?: boolean
    qrCodeContent?: string | null
    amountDescriptionOverride?: string | null
    amountLanguage?: string
    xmlContent: string
    status?: string
    totalHT?: number
    totalTVA?: number
    totalTTC?: number
    deletedAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lines?: InvoiceLineUncheckedCreateNestedManyWithoutInvoiceInput
    allowances?: AllowanceChargeUncheckedCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dispatchDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    signatureDate?: NullableStringFieldUpdateOperationsInput | string | null
    otherDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    operationNature?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    orderReference?: NullableStringFieldUpdateOperationsInput | string | null
    contractReference?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryNoteReference?: NullableStringFieldUpdateOperationsInput | string | null
    globalDiscount?: FloatFieldUpdateOperationsInput | number
    stampDuty?: FloatFieldUpdateOperationsInput | number
    ttnReference?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMeans?: StringFieldUpdateOperationsInput | string
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankRib?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    checkNumber?: NullableStringFieldUpdateOperationsInput | string | null
    cardType?: NullableStringFieldUpdateOperationsInput | string | null
    cardLast4?: NullableStringFieldUpdateOperationsInput | string | null
    cardReference?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    postalBranchCode?: NullableStringFieldUpdateOperationsInput | string | null
    postalServiceName?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentGateway?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentDescription?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    ircRate?: NullableFloatFieldUpdateOperationsInput | number | null
    ircAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    ircExemptionReason?: NullableStringFieldUpdateOperationsInput | string | null
    qrCodeEnabled?: BoolFieldUpdateOperationsInput | boolean
    qrCodeContent?: NullableStringFieldUpdateOperationsInput | string | null
    amountDescriptionOverride?: NullableStringFieldUpdateOperationsInput | string | null
    amountLanguage?: StringFieldUpdateOperationsInput | string
    xmlContent?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTVA?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInvoicesNestedInput
    supplier?: PartnerUpdateOneRequiredWithoutSupplierInvoicesNestedInput
    buyer?: PartnerUpdateOneRequiredWithoutBuyerInvoicesNestedInput
    lines?: InvoiceLineUpdateManyWithoutInvoiceNestedInput
    allowances?: AllowanceChargeUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dispatchDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    signatureDate?: NullableStringFieldUpdateOperationsInput | string | null
    otherDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    operationNature?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    orderReference?: NullableStringFieldUpdateOperationsInput | string | null
    contractReference?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryNoteReference?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    supplierId?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    globalDiscount?: FloatFieldUpdateOperationsInput | number
    stampDuty?: FloatFieldUpdateOperationsInput | number
    ttnReference?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMeans?: StringFieldUpdateOperationsInput | string
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankRib?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    checkNumber?: NullableStringFieldUpdateOperationsInput | string | null
    cardType?: NullableStringFieldUpdateOperationsInput | string | null
    cardLast4?: NullableStringFieldUpdateOperationsInput | string | null
    cardReference?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    postalBranchCode?: NullableStringFieldUpdateOperationsInput | string | null
    postalServiceName?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentGateway?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentDescription?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    ircRate?: NullableFloatFieldUpdateOperationsInput | number | null
    ircAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    ircExemptionReason?: NullableStringFieldUpdateOperationsInput | string | null
    qrCodeEnabled?: BoolFieldUpdateOperationsInput | boolean
    qrCodeContent?: NullableStringFieldUpdateOperationsInput | string | null
    amountDescriptionOverride?: NullableStringFieldUpdateOperationsInput | string | null
    amountLanguage?: StringFieldUpdateOperationsInput | string
    xmlContent?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTVA?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lines?: InvoiceLineUncheckedUpdateManyWithoutInvoiceNestedInput
    allowances?: AllowanceChargeUncheckedUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceCreateManyInput = {
    id?: string
    documentType: string
    documentNumber: string
    invoiceDate: Date | string
    dueDate?: Date | string | null
    deliveryDate?: Date | string | null
    dispatchDate?: Date | string | null
    paymentDate?: Date | string | null
    signatureDate?: string | null
    otherDate?: Date | string | null
    periodStart?: Date | string | null
    periodEnd?: Date | string | null
    operationNature: string
    currency?: string
    orderReference?: string | null
    contractReference?: string | null
    deliveryNoteReference?: string | null
    userId: string
    supplierId: string
    buyerId: string
    globalDiscount?: number
    stampDuty?: number
    ttnReference?: string | null
    paymentMeans: string
    bankName?: string | null
    bankCode?: string | null
    bankRib?: string | null
    bankAccountOwner?: string | null
    checkNumber?: string | null
    cardType?: string | null
    cardLast4?: string | null
    cardReference?: string | null
    postalAccountNumber?: string | null
    postalAccountOwner?: string | null
    postalBranchCode?: string | null
    postalServiceName?: string | null
    ePaymentGateway?: string | null
    ePaymentTransactionId?: string | null
    otherPaymentDescription?: string | null
    otherPaymentReference?: string | null
    ircRate?: number | null
    ircAmount?: number | null
    ircExemptionReason?: string | null
    qrCodeEnabled?: boolean
    qrCodeContent?: string | null
    amountDescriptionOverride?: string | null
    amountLanguage?: string
    xmlContent: string
    status?: string
    totalHT?: number
    totalTVA?: number
    totalTTC?: number
    deletedAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dispatchDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    signatureDate?: NullableStringFieldUpdateOperationsInput | string | null
    otherDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    operationNature?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    orderReference?: NullableStringFieldUpdateOperationsInput | string | null
    contractReference?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryNoteReference?: NullableStringFieldUpdateOperationsInput | string | null
    globalDiscount?: FloatFieldUpdateOperationsInput | number
    stampDuty?: FloatFieldUpdateOperationsInput | number
    ttnReference?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMeans?: StringFieldUpdateOperationsInput | string
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankRib?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    checkNumber?: NullableStringFieldUpdateOperationsInput | string | null
    cardType?: NullableStringFieldUpdateOperationsInput | string | null
    cardLast4?: NullableStringFieldUpdateOperationsInput | string | null
    cardReference?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    postalBranchCode?: NullableStringFieldUpdateOperationsInput | string | null
    postalServiceName?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentGateway?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentDescription?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    ircRate?: NullableFloatFieldUpdateOperationsInput | number | null
    ircAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    ircExemptionReason?: NullableStringFieldUpdateOperationsInput | string | null
    qrCodeEnabled?: BoolFieldUpdateOperationsInput | boolean
    qrCodeContent?: NullableStringFieldUpdateOperationsInput | string | null
    amountDescriptionOverride?: NullableStringFieldUpdateOperationsInput | string | null
    amountLanguage?: StringFieldUpdateOperationsInput | string
    xmlContent?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTVA?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dispatchDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    signatureDate?: NullableStringFieldUpdateOperationsInput | string | null
    otherDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    operationNature?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    orderReference?: NullableStringFieldUpdateOperationsInput | string | null
    contractReference?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryNoteReference?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    supplierId?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    globalDiscount?: FloatFieldUpdateOperationsInput | number
    stampDuty?: FloatFieldUpdateOperationsInput | number
    ttnReference?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMeans?: StringFieldUpdateOperationsInput | string
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankRib?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    checkNumber?: NullableStringFieldUpdateOperationsInput | string | null
    cardType?: NullableStringFieldUpdateOperationsInput | string | null
    cardLast4?: NullableStringFieldUpdateOperationsInput | string | null
    cardReference?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    postalBranchCode?: NullableStringFieldUpdateOperationsInput | string | null
    postalServiceName?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentGateway?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentDescription?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    ircRate?: NullableFloatFieldUpdateOperationsInput | number | null
    ircAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    ircExemptionReason?: NullableStringFieldUpdateOperationsInput | string | null
    qrCodeEnabled?: BoolFieldUpdateOperationsInput | boolean
    qrCodeContent?: NullableStringFieldUpdateOperationsInput | string | null
    amountDescriptionOverride?: NullableStringFieldUpdateOperationsInput | string | null
    amountLanguage?: StringFieldUpdateOperationsInput | string
    xmlContent?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTVA?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartnerCreateInput = {
    id?: string
    idType: string
    idValue: string
    name: string
    addressDescription?: string | null
    street: string
    city: string
    postalCode: string
    country: string
    rc?: string | null
    capital?: string | null
    phone?: string | null
    email?: string | null
    partnerType?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    supplierInvoices?: InvoiceCreateNestedManyWithoutSupplierInput
    buyerInvoices?: InvoiceCreateNestedManyWithoutBuyerInput
  }

  export type PartnerUncheckedCreateInput = {
    id?: string
    idType: string
    idValue: string
    name: string
    addressDescription?: string | null
    street: string
    city: string
    postalCode: string
    country: string
    rc?: string | null
    capital?: string | null
    phone?: string | null
    email?: string | null
    partnerType?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    supplierInvoices?: InvoiceUncheckedCreateNestedManyWithoutSupplierInput
    buyerInvoices?: InvoiceUncheckedCreateNestedManyWithoutBuyerInput
  }

  export type PartnerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    idType?: StringFieldUpdateOperationsInput | string
    idValue?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    addressDescription?: NullableStringFieldUpdateOperationsInput | string | null
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    rc?: NullableStringFieldUpdateOperationsInput | string | null
    capital?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    partnerType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supplierInvoices?: InvoiceUpdateManyWithoutSupplierNestedInput
    buyerInvoices?: InvoiceUpdateManyWithoutBuyerNestedInput
  }

  export type PartnerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    idType?: StringFieldUpdateOperationsInput | string
    idValue?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    addressDescription?: NullableStringFieldUpdateOperationsInput | string | null
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    rc?: NullableStringFieldUpdateOperationsInput | string | null
    capital?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    partnerType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supplierInvoices?: InvoiceUncheckedUpdateManyWithoutSupplierNestedInput
    buyerInvoices?: InvoiceUncheckedUpdateManyWithoutBuyerNestedInput
  }

  export type PartnerCreateManyInput = {
    id?: string
    idType: string
    idValue: string
    name: string
    addressDescription?: string | null
    street: string
    city: string
    postalCode: string
    country: string
    rc?: string | null
    capital?: string | null
    phone?: string | null
    email?: string | null
    partnerType?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartnerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    idType?: StringFieldUpdateOperationsInput | string
    idValue?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    addressDescription?: NullableStringFieldUpdateOperationsInput | string | null
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    rc?: NullableStringFieldUpdateOperationsInput | string | null
    capital?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    partnerType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartnerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    idType?: StringFieldUpdateOperationsInput | string
    idValue?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    addressDescription?: NullableStringFieldUpdateOperationsInput | string | null
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    rc?: NullableStringFieldUpdateOperationsInput | string | null
    capital?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    partnerType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceLineCreateInput = {
    id?: string
    itemCode: string
    description: string
    quantity: number
    unit: string
    unitPrice: number
    discountRate?: number
    taxRate: number
    fodec?: boolean
    exemptionReason?: string | null
    lineAmount: number
    taxAmount: number
    totalAmount: number
    createdAt?: Date | string
    updatedAt?: Date | string
    invoice: InvoiceCreateNestedOneWithoutLinesInput
    allowances?: AllowanceChargeCreateNestedManyWithoutLineInput
  }

  export type InvoiceLineUncheckedCreateInput = {
    id?: string
    invoiceId: string
    itemCode: string
    description: string
    quantity: number
    unit: string
    unitPrice: number
    discountRate?: number
    taxRate: number
    fodec?: boolean
    exemptionReason?: string | null
    lineAmount: number
    taxAmount: number
    totalAmount: number
    createdAt?: Date | string
    updatedAt?: Date | string
    allowances?: AllowanceChargeUncheckedCreateNestedManyWithoutLineInput
  }

  export type InvoiceLineUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemCode?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    unitPrice?: FloatFieldUpdateOperationsInput | number
    discountRate?: FloatFieldUpdateOperationsInput | number
    taxRate?: FloatFieldUpdateOperationsInput | number
    fodec?: BoolFieldUpdateOperationsInput | boolean
    exemptionReason?: NullableStringFieldUpdateOperationsInput | string | null
    lineAmount?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoice?: InvoiceUpdateOneRequiredWithoutLinesNestedInput
    allowances?: AllowanceChargeUpdateManyWithoutLineNestedInput
  }

  export type InvoiceLineUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceId?: StringFieldUpdateOperationsInput | string
    itemCode?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    unitPrice?: FloatFieldUpdateOperationsInput | number
    discountRate?: FloatFieldUpdateOperationsInput | number
    taxRate?: FloatFieldUpdateOperationsInput | number
    fodec?: BoolFieldUpdateOperationsInput | boolean
    exemptionReason?: NullableStringFieldUpdateOperationsInput | string | null
    lineAmount?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowances?: AllowanceChargeUncheckedUpdateManyWithoutLineNestedInput
  }

  export type InvoiceLineCreateManyInput = {
    id?: string
    invoiceId: string
    itemCode: string
    description: string
    quantity: number
    unit: string
    unitPrice: number
    discountRate?: number
    taxRate: number
    fodec?: boolean
    exemptionReason?: string | null
    lineAmount: number
    taxAmount: number
    totalAmount: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceLineUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemCode?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    unitPrice?: FloatFieldUpdateOperationsInput | number
    discountRate?: FloatFieldUpdateOperationsInput | number
    taxRate?: FloatFieldUpdateOperationsInput | number
    fodec?: BoolFieldUpdateOperationsInput | boolean
    exemptionReason?: NullableStringFieldUpdateOperationsInput | string | null
    lineAmount?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceLineUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceId?: StringFieldUpdateOperationsInput | string
    itemCode?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    unitPrice?: FloatFieldUpdateOperationsInput | number
    discountRate?: FloatFieldUpdateOperationsInput | number
    taxRate?: FloatFieldUpdateOperationsInput | number
    fodec?: BoolFieldUpdateOperationsInput | boolean
    exemptionReason?: NullableStringFieldUpdateOperationsInput | string | null
    lineAmount?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AllowanceChargeCreateInput = {
    id?: string
    type: string
    code: string
    description: string
    amount: number
    basedOn?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoice?: InvoiceCreateNestedOneWithoutAllowancesInput
    line?: InvoiceLineCreateNestedOneWithoutAllowancesInput
  }

  export type AllowanceChargeUncheckedCreateInput = {
    id?: string
    type: string
    code: string
    description: string
    amount: number
    basedOn?: string | null
    invoiceId?: string | null
    lineId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AllowanceChargeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    basedOn?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoice?: InvoiceUpdateOneWithoutAllowancesNestedInput
    line?: InvoiceLineUpdateOneWithoutAllowancesNestedInput
  }

  export type AllowanceChargeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    basedOn?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    lineId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AllowanceChargeCreateManyInput = {
    id?: string
    type: string
    code: string
    description: string
    amount: number
    basedOn?: string | null
    invoiceId?: string | null
    lineId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AllowanceChargeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    basedOn?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AllowanceChargeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    basedOn?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    lineId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type InvoiceListRelationFilter = {
    every?: InvoiceWhereInput
    some?: InvoiceWhereInput
    none?: InvoiceWhereInput
  }

  export type RefreshTokenListRelationFilter = {
    every?: RefreshTokenWhereInput
    some?: RefreshTokenWhereInput
    none?: RefreshTokenWhereInput
  }

  export type UserSignatureNullableRelationFilter = {
    is?: UserSignatureWhereInput | null
    isNot?: UserSignatureWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type InvoiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RefreshTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    emailVerified?: SortOrder
    verificationCode?: SortOrder
    verificationCodeExpires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    emailVerified?: SortOrder
    verificationCode?: SortOrder
    verificationCodeExpires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    emailVerified?: SortOrder
    verificationCode?: SortOrder
    verificationCodeExpires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserSignatureCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    certificateFilename?: SortOrder
    encryptedContent?: SortOrder
    signaturePinHash?: SortOrder
    certificateSubject?: SortOrder
    certificateIssuer?: SortOrder
    certificateSerialNumber?: SortOrder
    certificateValidFrom?: SortOrder
    certificateValidUntil?: SortOrder
    keyAlgorithm?: SortOrder
    status?: SortOrder
    uploadedAt?: SortOrder
    lastUsedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSignatureMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    certificateFilename?: SortOrder
    encryptedContent?: SortOrder
    signaturePinHash?: SortOrder
    certificateSubject?: SortOrder
    certificateIssuer?: SortOrder
    certificateSerialNumber?: SortOrder
    certificateValidFrom?: SortOrder
    certificateValidUntil?: SortOrder
    keyAlgorithm?: SortOrder
    status?: SortOrder
    uploadedAt?: SortOrder
    lastUsedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSignatureMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    certificateFilename?: SortOrder
    encryptedContent?: SortOrder
    signaturePinHash?: SortOrder
    certificateSubject?: SortOrder
    certificateIssuer?: SortOrder
    certificateSerialNumber?: SortOrder
    certificateValidFrom?: SortOrder
    certificateValidUntil?: SortOrder
    keyAlgorithm?: SortOrder
    status?: SortOrder
    uploadedAt?: SortOrder
    lastUsedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SignatureAuditCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    invoiceId?: SortOrder
    documentNumber?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    certificateUsed?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type SignatureAuditMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    invoiceId?: SortOrder
    documentNumber?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    certificateUsed?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type SignatureAuditMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    invoiceId?: SortOrder
    documentNumber?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    certificateUsed?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshTokenCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrder
  }

  export type RefreshTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrder
  }

  export type RefreshTokenMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type PartnerRelationFilter = {
    is?: PartnerWhereInput
    isNot?: PartnerWhereInput
  }

  export type InvoiceLineListRelationFilter = {
    every?: InvoiceLineWhereInput
    some?: InvoiceLineWhereInput
    none?: InvoiceLineWhereInput
  }

  export type AllowanceChargeListRelationFilter = {
    every?: AllowanceChargeWhereInput
    some?: AllowanceChargeWhereInput
    none?: AllowanceChargeWhereInput
  }

  export type InvoiceLineOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AllowanceChargeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InvoiceCountOrderByAggregateInput = {
    id?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    invoiceDate?: SortOrder
    dueDate?: SortOrder
    deliveryDate?: SortOrder
    dispatchDate?: SortOrder
    paymentDate?: SortOrder
    signatureDate?: SortOrder
    otherDate?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    operationNature?: SortOrder
    currency?: SortOrder
    orderReference?: SortOrder
    contractReference?: SortOrder
    deliveryNoteReference?: SortOrder
    userId?: SortOrder
    supplierId?: SortOrder
    buyerId?: SortOrder
    globalDiscount?: SortOrder
    stampDuty?: SortOrder
    ttnReference?: SortOrder
    paymentMeans?: SortOrder
    bankName?: SortOrder
    bankCode?: SortOrder
    bankRib?: SortOrder
    bankAccountOwner?: SortOrder
    checkNumber?: SortOrder
    cardType?: SortOrder
    cardLast4?: SortOrder
    cardReference?: SortOrder
    postalAccountNumber?: SortOrder
    postalAccountOwner?: SortOrder
    postalBranchCode?: SortOrder
    postalServiceName?: SortOrder
    ePaymentGateway?: SortOrder
    ePaymentTransactionId?: SortOrder
    otherPaymentDescription?: SortOrder
    otherPaymentReference?: SortOrder
    ircRate?: SortOrder
    ircAmount?: SortOrder
    ircExemptionReason?: SortOrder
    qrCodeEnabled?: SortOrder
    qrCodeContent?: SortOrder
    amountDescriptionOverride?: SortOrder
    amountLanguage?: SortOrder
    xmlContent?: SortOrder
    status?: SortOrder
    totalHT?: SortOrder
    totalTVA?: SortOrder
    totalTTC?: SortOrder
    deletedAt?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceAvgOrderByAggregateInput = {
    globalDiscount?: SortOrder
    stampDuty?: SortOrder
    ircRate?: SortOrder
    ircAmount?: SortOrder
    totalHT?: SortOrder
    totalTVA?: SortOrder
    totalTTC?: SortOrder
  }

  export type InvoiceMaxOrderByAggregateInput = {
    id?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    invoiceDate?: SortOrder
    dueDate?: SortOrder
    deliveryDate?: SortOrder
    dispatchDate?: SortOrder
    paymentDate?: SortOrder
    signatureDate?: SortOrder
    otherDate?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    operationNature?: SortOrder
    currency?: SortOrder
    orderReference?: SortOrder
    contractReference?: SortOrder
    deliveryNoteReference?: SortOrder
    userId?: SortOrder
    supplierId?: SortOrder
    buyerId?: SortOrder
    globalDiscount?: SortOrder
    stampDuty?: SortOrder
    ttnReference?: SortOrder
    paymentMeans?: SortOrder
    bankName?: SortOrder
    bankCode?: SortOrder
    bankRib?: SortOrder
    bankAccountOwner?: SortOrder
    checkNumber?: SortOrder
    cardType?: SortOrder
    cardLast4?: SortOrder
    cardReference?: SortOrder
    postalAccountNumber?: SortOrder
    postalAccountOwner?: SortOrder
    postalBranchCode?: SortOrder
    postalServiceName?: SortOrder
    ePaymentGateway?: SortOrder
    ePaymentTransactionId?: SortOrder
    otherPaymentDescription?: SortOrder
    otherPaymentReference?: SortOrder
    ircRate?: SortOrder
    ircAmount?: SortOrder
    ircExemptionReason?: SortOrder
    qrCodeEnabled?: SortOrder
    qrCodeContent?: SortOrder
    amountDescriptionOverride?: SortOrder
    amountLanguage?: SortOrder
    xmlContent?: SortOrder
    status?: SortOrder
    totalHT?: SortOrder
    totalTVA?: SortOrder
    totalTTC?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceMinOrderByAggregateInput = {
    id?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    invoiceDate?: SortOrder
    dueDate?: SortOrder
    deliveryDate?: SortOrder
    dispatchDate?: SortOrder
    paymentDate?: SortOrder
    signatureDate?: SortOrder
    otherDate?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    operationNature?: SortOrder
    currency?: SortOrder
    orderReference?: SortOrder
    contractReference?: SortOrder
    deliveryNoteReference?: SortOrder
    userId?: SortOrder
    supplierId?: SortOrder
    buyerId?: SortOrder
    globalDiscount?: SortOrder
    stampDuty?: SortOrder
    ttnReference?: SortOrder
    paymentMeans?: SortOrder
    bankName?: SortOrder
    bankCode?: SortOrder
    bankRib?: SortOrder
    bankAccountOwner?: SortOrder
    checkNumber?: SortOrder
    cardType?: SortOrder
    cardLast4?: SortOrder
    cardReference?: SortOrder
    postalAccountNumber?: SortOrder
    postalAccountOwner?: SortOrder
    postalBranchCode?: SortOrder
    postalServiceName?: SortOrder
    ePaymentGateway?: SortOrder
    ePaymentTransactionId?: SortOrder
    otherPaymentDescription?: SortOrder
    otherPaymentReference?: SortOrder
    ircRate?: SortOrder
    ircAmount?: SortOrder
    ircExemptionReason?: SortOrder
    qrCodeEnabled?: SortOrder
    qrCodeContent?: SortOrder
    amountDescriptionOverride?: SortOrder
    amountLanguage?: SortOrder
    xmlContent?: SortOrder
    status?: SortOrder
    totalHT?: SortOrder
    totalTVA?: SortOrder
    totalTTC?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceSumOrderByAggregateInput = {
    globalDiscount?: SortOrder
    stampDuty?: SortOrder
    ircRate?: SortOrder
    ircAmount?: SortOrder
    totalHT?: SortOrder
    totalTVA?: SortOrder
    totalTTC?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type PartnerIdTypeIdValueCompoundUniqueInput = {
    idType: string
    idValue: string
  }

  export type PartnerCountOrderByAggregateInput = {
    id?: SortOrder
    idType?: SortOrder
    idValue?: SortOrder
    name?: SortOrder
    addressDescription?: SortOrder
    street?: SortOrder
    city?: SortOrder
    postalCode?: SortOrder
    country?: SortOrder
    rc?: SortOrder
    capital?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    partnerType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartnerMaxOrderByAggregateInput = {
    id?: SortOrder
    idType?: SortOrder
    idValue?: SortOrder
    name?: SortOrder
    addressDescription?: SortOrder
    street?: SortOrder
    city?: SortOrder
    postalCode?: SortOrder
    country?: SortOrder
    rc?: SortOrder
    capital?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    partnerType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartnerMinOrderByAggregateInput = {
    id?: SortOrder
    idType?: SortOrder
    idValue?: SortOrder
    name?: SortOrder
    addressDescription?: SortOrder
    street?: SortOrder
    city?: SortOrder
    postalCode?: SortOrder
    country?: SortOrder
    rc?: SortOrder
    capital?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    partnerType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceRelationFilter = {
    is?: InvoiceWhereInput
    isNot?: InvoiceWhereInput
  }

  export type InvoiceLineCountOrderByAggregateInput = {
    id?: SortOrder
    invoiceId?: SortOrder
    itemCode?: SortOrder
    description?: SortOrder
    quantity?: SortOrder
    unit?: SortOrder
    unitPrice?: SortOrder
    discountRate?: SortOrder
    taxRate?: SortOrder
    fodec?: SortOrder
    exemptionReason?: SortOrder
    lineAmount?: SortOrder
    taxAmount?: SortOrder
    totalAmount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceLineAvgOrderByAggregateInput = {
    quantity?: SortOrder
    unitPrice?: SortOrder
    discountRate?: SortOrder
    taxRate?: SortOrder
    lineAmount?: SortOrder
    taxAmount?: SortOrder
    totalAmount?: SortOrder
  }

  export type InvoiceLineMaxOrderByAggregateInput = {
    id?: SortOrder
    invoiceId?: SortOrder
    itemCode?: SortOrder
    description?: SortOrder
    quantity?: SortOrder
    unit?: SortOrder
    unitPrice?: SortOrder
    discountRate?: SortOrder
    taxRate?: SortOrder
    fodec?: SortOrder
    exemptionReason?: SortOrder
    lineAmount?: SortOrder
    taxAmount?: SortOrder
    totalAmount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceLineMinOrderByAggregateInput = {
    id?: SortOrder
    invoiceId?: SortOrder
    itemCode?: SortOrder
    description?: SortOrder
    quantity?: SortOrder
    unit?: SortOrder
    unitPrice?: SortOrder
    discountRate?: SortOrder
    taxRate?: SortOrder
    fodec?: SortOrder
    exemptionReason?: SortOrder
    lineAmount?: SortOrder
    taxAmount?: SortOrder
    totalAmount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceLineSumOrderByAggregateInput = {
    quantity?: SortOrder
    unitPrice?: SortOrder
    discountRate?: SortOrder
    taxRate?: SortOrder
    lineAmount?: SortOrder
    taxAmount?: SortOrder
    totalAmount?: SortOrder
  }

  export type InvoiceNullableRelationFilter = {
    is?: InvoiceWhereInput | null
    isNot?: InvoiceWhereInput | null
  }

  export type InvoiceLineNullableRelationFilter = {
    is?: InvoiceLineWhereInput | null
    isNot?: InvoiceLineWhereInput | null
  }

  export type AllowanceChargeCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    code?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    basedOn?: SortOrder
    invoiceId?: SortOrder
    lineId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AllowanceChargeAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type AllowanceChargeMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    code?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    basedOn?: SortOrder
    invoiceId?: SortOrder
    lineId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AllowanceChargeMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    code?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    basedOn?: SortOrder
    invoiceId?: SortOrder
    lineId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AllowanceChargeSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type InvoiceCreateNestedManyWithoutUserInput = {
    create?: XOR<InvoiceCreateWithoutUserInput, InvoiceUncheckedCreateWithoutUserInput> | InvoiceCreateWithoutUserInput[] | InvoiceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutUserInput | InvoiceCreateOrConnectWithoutUserInput[]
    createMany?: InvoiceCreateManyUserInputEnvelope
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
  }

  export type RefreshTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type UserSignatureCreateNestedOneWithoutUserInput = {
    create?: XOR<UserSignatureCreateWithoutUserInput, UserSignatureUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserSignatureCreateOrConnectWithoutUserInput
    connect?: UserSignatureWhereUniqueInput
  }

  export type InvoiceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<InvoiceCreateWithoutUserInput, InvoiceUncheckedCreateWithoutUserInput> | InvoiceCreateWithoutUserInput[] | InvoiceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutUserInput | InvoiceCreateOrConnectWithoutUserInput[]
    createMany?: InvoiceCreateManyUserInputEnvelope
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
  }

  export type RefreshTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type UserSignatureUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<UserSignatureCreateWithoutUserInput, UserSignatureUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserSignatureCreateOrConnectWithoutUserInput
    connect?: UserSignatureWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type InvoiceUpdateManyWithoutUserNestedInput = {
    create?: XOR<InvoiceCreateWithoutUserInput, InvoiceUncheckedCreateWithoutUserInput> | InvoiceCreateWithoutUserInput[] | InvoiceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutUserInput | InvoiceCreateOrConnectWithoutUserInput[]
    upsert?: InvoiceUpsertWithWhereUniqueWithoutUserInput | InvoiceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: InvoiceCreateManyUserInputEnvelope
    set?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    disconnect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    delete?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    update?: InvoiceUpdateWithWhereUniqueWithoutUserInput | InvoiceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: InvoiceUpdateManyWithWhereWithoutUserInput | InvoiceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
  }

  export type RefreshTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type UserSignatureUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserSignatureCreateWithoutUserInput, UserSignatureUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserSignatureCreateOrConnectWithoutUserInput
    upsert?: UserSignatureUpsertWithoutUserInput
    disconnect?: UserSignatureWhereInput | boolean
    delete?: UserSignatureWhereInput | boolean
    connect?: UserSignatureWhereUniqueInput
    update?: XOR<XOR<UserSignatureUpdateToOneWithWhereWithoutUserInput, UserSignatureUpdateWithoutUserInput>, UserSignatureUncheckedUpdateWithoutUserInput>
  }

  export type InvoiceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<InvoiceCreateWithoutUserInput, InvoiceUncheckedCreateWithoutUserInput> | InvoiceCreateWithoutUserInput[] | InvoiceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutUserInput | InvoiceCreateOrConnectWithoutUserInput[]
    upsert?: InvoiceUpsertWithWhereUniqueWithoutUserInput | InvoiceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: InvoiceCreateManyUserInputEnvelope
    set?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    disconnect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    delete?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    update?: InvoiceUpdateWithWhereUniqueWithoutUserInput | InvoiceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: InvoiceUpdateManyWithWhereWithoutUserInput | InvoiceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type UserSignatureUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserSignatureCreateWithoutUserInput, UserSignatureUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserSignatureCreateOrConnectWithoutUserInput
    upsert?: UserSignatureUpsertWithoutUserInput
    disconnect?: UserSignatureWhereInput | boolean
    delete?: UserSignatureWhereInput | boolean
    connect?: UserSignatureWhereUniqueInput
    update?: XOR<XOR<UserSignatureUpdateToOneWithWhereWithoutUserInput, UserSignatureUpdateWithoutUserInput>, UserSignatureUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutSignatureInput = {
    create?: XOR<UserCreateWithoutSignatureInput, UserUncheckedCreateWithoutSignatureInput>
    connectOrCreate?: UserCreateOrConnectWithoutSignatureInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSignatureNestedInput = {
    create?: XOR<UserCreateWithoutSignatureInput, UserUncheckedCreateWithoutSignatureInput>
    connectOrCreate?: UserCreateOrConnectWithoutSignatureInput
    upsert?: UserUpsertWithoutSignatureInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSignatureInput, UserUpdateWithoutSignatureInput>, UserUncheckedUpdateWithoutSignatureInput>
  }

  export type UserCreateNestedOneWithoutRefreshTokensInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRefreshTokensNestedInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput
    upsert?: UserUpsertWithoutRefreshTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRefreshTokensInput, UserUpdateWithoutRefreshTokensInput>, UserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type UserCreateNestedOneWithoutInvoicesInput = {
    create?: XOR<UserCreateWithoutInvoicesInput, UserUncheckedCreateWithoutInvoicesInput>
    connectOrCreate?: UserCreateOrConnectWithoutInvoicesInput
    connect?: UserWhereUniqueInput
  }

  export type PartnerCreateNestedOneWithoutSupplierInvoicesInput = {
    create?: XOR<PartnerCreateWithoutSupplierInvoicesInput, PartnerUncheckedCreateWithoutSupplierInvoicesInput>
    connectOrCreate?: PartnerCreateOrConnectWithoutSupplierInvoicesInput
    connect?: PartnerWhereUniqueInput
  }

  export type PartnerCreateNestedOneWithoutBuyerInvoicesInput = {
    create?: XOR<PartnerCreateWithoutBuyerInvoicesInput, PartnerUncheckedCreateWithoutBuyerInvoicesInput>
    connectOrCreate?: PartnerCreateOrConnectWithoutBuyerInvoicesInput
    connect?: PartnerWhereUniqueInput
  }

  export type InvoiceLineCreateNestedManyWithoutInvoiceInput = {
    create?: XOR<InvoiceLineCreateWithoutInvoiceInput, InvoiceLineUncheckedCreateWithoutInvoiceInput> | InvoiceLineCreateWithoutInvoiceInput[] | InvoiceLineUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: InvoiceLineCreateOrConnectWithoutInvoiceInput | InvoiceLineCreateOrConnectWithoutInvoiceInput[]
    createMany?: InvoiceLineCreateManyInvoiceInputEnvelope
    connect?: InvoiceLineWhereUniqueInput | InvoiceLineWhereUniqueInput[]
  }

  export type AllowanceChargeCreateNestedManyWithoutInvoiceInput = {
    create?: XOR<AllowanceChargeCreateWithoutInvoiceInput, AllowanceChargeUncheckedCreateWithoutInvoiceInput> | AllowanceChargeCreateWithoutInvoiceInput[] | AllowanceChargeUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: AllowanceChargeCreateOrConnectWithoutInvoiceInput | AllowanceChargeCreateOrConnectWithoutInvoiceInput[]
    createMany?: AllowanceChargeCreateManyInvoiceInputEnvelope
    connect?: AllowanceChargeWhereUniqueInput | AllowanceChargeWhereUniqueInput[]
  }

  export type InvoiceLineUncheckedCreateNestedManyWithoutInvoiceInput = {
    create?: XOR<InvoiceLineCreateWithoutInvoiceInput, InvoiceLineUncheckedCreateWithoutInvoiceInput> | InvoiceLineCreateWithoutInvoiceInput[] | InvoiceLineUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: InvoiceLineCreateOrConnectWithoutInvoiceInput | InvoiceLineCreateOrConnectWithoutInvoiceInput[]
    createMany?: InvoiceLineCreateManyInvoiceInputEnvelope
    connect?: InvoiceLineWhereUniqueInput | InvoiceLineWhereUniqueInput[]
  }

  export type AllowanceChargeUncheckedCreateNestedManyWithoutInvoiceInput = {
    create?: XOR<AllowanceChargeCreateWithoutInvoiceInput, AllowanceChargeUncheckedCreateWithoutInvoiceInput> | AllowanceChargeCreateWithoutInvoiceInput[] | AllowanceChargeUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: AllowanceChargeCreateOrConnectWithoutInvoiceInput | AllowanceChargeCreateOrConnectWithoutInvoiceInput[]
    createMany?: AllowanceChargeCreateManyInvoiceInputEnvelope
    connect?: AllowanceChargeWhereUniqueInput | AllowanceChargeWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutInvoicesNestedInput = {
    create?: XOR<UserCreateWithoutInvoicesInput, UserUncheckedCreateWithoutInvoicesInput>
    connectOrCreate?: UserCreateOrConnectWithoutInvoicesInput
    upsert?: UserUpsertWithoutInvoicesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInvoicesInput, UserUpdateWithoutInvoicesInput>, UserUncheckedUpdateWithoutInvoicesInput>
  }

  export type PartnerUpdateOneRequiredWithoutSupplierInvoicesNestedInput = {
    create?: XOR<PartnerCreateWithoutSupplierInvoicesInput, PartnerUncheckedCreateWithoutSupplierInvoicesInput>
    connectOrCreate?: PartnerCreateOrConnectWithoutSupplierInvoicesInput
    upsert?: PartnerUpsertWithoutSupplierInvoicesInput
    connect?: PartnerWhereUniqueInput
    update?: XOR<XOR<PartnerUpdateToOneWithWhereWithoutSupplierInvoicesInput, PartnerUpdateWithoutSupplierInvoicesInput>, PartnerUncheckedUpdateWithoutSupplierInvoicesInput>
  }

  export type PartnerUpdateOneRequiredWithoutBuyerInvoicesNestedInput = {
    create?: XOR<PartnerCreateWithoutBuyerInvoicesInput, PartnerUncheckedCreateWithoutBuyerInvoicesInput>
    connectOrCreate?: PartnerCreateOrConnectWithoutBuyerInvoicesInput
    upsert?: PartnerUpsertWithoutBuyerInvoicesInput
    connect?: PartnerWhereUniqueInput
    update?: XOR<XOR<PartnerUpdateToOneWithWhereWithoutBuyerInvoicesInput, PartnerUpdateWithoutBuyerInvoicesInput>, PartnerUncheckedUpdateWithoutBuyerInvoicesInput>
  }

  export type InvoiceLineUpdateManyWithoutInvoiceNestedInput = {
    create?: XOR<InvoiceLineCreateWithoutInvoiceInput, InvoiceLineUncheckedCreateWithoutInvoiceInput> | InvoiceLineCreateWithoutInvoiceInput[] | InvoiceLineUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: InvoiceLineCreateOrConnectWithoutInvoiceInput | InvoiceLineCreateOrConnectWithoutInvoiceInput[]
    upsert?: InvoiceLineUpsertWithWhereUniqueWithoutInvoiceInput | InvoiceLineUpsertWithWhereUniqueWithoutInvoiceInput[]
    createMany?: InvoiceLineCreateManyInvoiceInputEnvelope
    set?: InvoiceLineWhereUniqueInput | InvoiceLineWhereUniqueInput[]
    disconnect?: InvoiceLineWhereUniqueInput | InvoiceLineWhereUniqueInput[]
    delete?: InvoiceLineWhereUniqueInput | InvoiceLineWhereUniqueInput[]
    connect?: InvoiceLineWhereUniqueInput | InvoiceLineWhereUniqueInput[]
    update?: InvoiceLineUpdateWithWhereUniqueWithoutInvoiceInput | InvoiceLineUpdateWithWhereUniqueWithoutInvoiceInput[]
    updateMany?: InvoiceLineUpdateManyWithWhereWithoutInvoiceInput | InvoiceLineUpdateManyWithWhereWithoutInvoiceInput[]
    deleteMany?: InvoiceLineScalarWhereInput | InvoiceLineScalarWhereInput[]
  }

  export type AllowanceChargeUpdateManyWithoutInvoiceNestedInput = {
    create?: XOR<AllowanceChargeCreateWithoutInvoiceInput, AllowanceChargeUncheckedCreateWithoutInvoiceInput> | AllowanceChargeCreateWithoutInvoiceInput[] | AllowanceChargeUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: AllowanceChargeCreateOrConnectWithoutInvoiceInput | AllowanceChargeCreateOrConnectWithoutInvoiceInput[]
    upsert?: AllowanceChargeUpsertWithWhereUniqueWithoutInvoiceInput | AllowanceChargeUpsertWithWhereUniqueWithoutInvoiceInput[]
    createMany?: AllowanceChargeCreateManyInvoiceInputEnvelope
    set?: AllowanceChargeWhereUniqueInput | AllowanceChargeWhereUniqueInput[]
    disconnect?: AllowanceChargeWhereUniqueInput | AllowanceChargeWhereUniqueInput[]
    delete?: AllowanceChargeWhereUniqueInput | AllowanceChargeWhereUniqueInput[]
    connect?: AllowanceChargeWhereUniqueInput | AllowanceChargeWhereUniqueInput[]
    update?: AllowanceChargeUpdateWithWhereUniqueWithoutInvoiceInput | AllowanceChargeUpdateWithWhereUniqueWithoutInvoiceInput[]
    updateMany?: AllowanceChargeUpdateManyWithWhereWithoutInvoiceInput | AllowanceChargeUpdateManyWithWhereWithoutInvoiceInput[]
    deleteMany?: AllowanceChargeScalarWhereInput | AllowanceChargeScalarWhereInput[]
  }

  export type InvoiceLineUncheckedUpdateManyWithoutInvoiceNestedInput = {
    create?: XOR<InvoiceLineCreateWithoutInvoiceInput, InvoiceLineUncheckedCreateWithoutInvoiceInput> | InvoiceLineCreateWithoutInvoiceInput[] | InvoiceLineUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: InvoiceLineCreateOrConnectWithoutInvoiceInput | InvoiceLineCreateOrConnectWithoutInvoiceInput[]
    upsert?: InvoiceLineUpsertWithWhereUniqueWithoutInvoiceInput | InvoiceLineUpsertWithWhereUniqueWithoutInvoiceInput[]
    createMany?: InvoiceLineCreateManyInvoiceInputEnvelope
    set?: InvoiceLineWhereUniqueInput | InvoiceLineWhereUniqueInput[]
    disconnect?: InvoiceLineWhereUniqueInput | InvoiceLineWhereUniqueInput[]
    delete?: InvoiceLineWhereUniqueInput | InvoiceLineWhereUniqueInput[]
    connect?: InvoiceLineWhereUniqueInput | InvoiceLineWhereUniqueInput[]
    update?: InvoiceLineUpdateWithWhereUniqueWithoutInvoiceInput | InvoiceLineUpdateWithWhereUniqueWithoutInvoiceInput[]
    updateMany?: InvoiceLineUpdateManyWithWhereWithoutInvoiceInput | InvoiceLineUpdateManyWithWhereWithoutInvoiceInput[]
    deleteMany?: InvoiceLineScalarWhereInput | InvoiceLineScalarWhereInput[]
  }

  export type AllowanceChargeUncheckedUpdateManyWithoutInvoiceNestedInput = {
    create?: XOR<AllowanceChargeCreateWithoutInvoiceInput, AllowanceChargeUncheckedCreateWithoutInvoiceInput> | AllowanceChargeCreateWithoutInvoiceInput[] | AllowanceChargeUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: AllowanceChargeCreateOrConnectWithoutInvoiceInput | AllowanceChargeCreateOrConnectWithoutInvoiceInput[]
    upsert?: AllowanceChargeUpsertWithWhereUniqueWithoutInvoiceInput | AllowanceChargeUpsertWithWhereUniqueWithoutInvoiceInput[]
    createMany?: AllowanceChargeCreateManyInvoiceInputEnvelope
    set?: AllowanceChargeWhereUniqueInput | AllowanceChargeWhereUniqueInput[]
    disconnect?: AllowanceChargeWhereUniqueInput | AllowanceChargeWhereUniqueInput[]
    delete?: AllowanceChargeWhereUniqueInput | AllowanceChargeWhereUniqueInput[]
    connect?: AllowanceChargeWhereUniqueInput | AllowanceChargeWhereUniqueInput[]
    update?: AllowanceChargeUpdateWithWhereUniqueWithoutInvoiceInput | AllowanceChargeUpdateWithWhereUniqueWithoutInvoiceInput[]
    updateMany?: AllowanceChargeUpdateManyWithWhereWithoutInvoiceInput | AllowanceChargeUpdateManyWithWhereWithoutInvoiceInput[]
    deleteMany?: AllowanceChargeScalarWhereInput | AllowanceChargeScalarWhereInput[]
  }

  export type InvoiceCreateNestedManyWithoutSupplierInput = {
    create?: XOR<InvoiceCreateWithoutSupplierInput, InvoiceUncheckedCreateWithoutSupplierInput> | InvoiceCreateWithoutSupplierInput[] | InvoiceUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutSupplierInput | InvoiceCreateOrConnectWithoutSupplierInput[]
    createMany?: InvoiceCreateManySupplierInputEnvelope
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
  }

  export type InvoiceCreateNestedManyWithoutBuyerInput = {
    create?: XOR<InvoiceCreateWithoutBuyerInput, InvoiceUncheckedCreateWithoutBuyerInput> | InvoiceCreateWithoutBuyerInput[] | InvoiceUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutBuyerInput | InvoiceCreateOrConnectWithoutBuyerInput[]
    createMany?: InvoiceCreateManyBuyerInputEnvelope
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
  }

  export type InvoiceUncheckedCreateNestedManyWithoutSupplierInput = {
    create?: XOR<InvoiceCreateWithoutSupplierInput, InvoiceUncheckedCreateWithoutSupplierInput> | InvoiceCreateWithoutSupplierInput[] | InvoiceUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutSupplierInput | InvoiceCreateOrConnectWithoutSupplierInput[]
    createMany?: InvoiceCreateManySupplierInputEnvelope
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
  }

  export type InvoiceUncheckedCreateNestedManyWithoutBuyerInput = {
    create?: XOR<InvoiceCreateWithoutBuyerInput, InvoiceUncheckedCreateWithoutBuyerInput> | InvoiceCreateWithoutBuyerInput[] | InvoiceUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutBuyerInput | InvoiceCreateOrConnectWithoutBuyerInput[]
    createMany?: InvoiceCreateManyBuyerInputEnvelope
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
  }

  export type InvoiceUpdateManyWithoutSupplierNestedInput = {
    create?: XOR<InvoiceCreateWithoutSupplierInput, InvoiceUncheckedCreateWithoutSupplierInput> | InvoiceCreateWithoutSupplierInput[] | InvoiceUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutSupplierInput | InvoiceCreateOrConnectWithoutSupplierInput[]
    upsert?: InvoiceUpsertWithWhereUniqueWithoutSupplierInput | InvoiceUpsertWithWhereUniqueWithoutSupplierInput[]
    createMany?: InvoiceCreateManySupplierInputEnvelope
    set?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    disconnect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    delete?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    update?: InvoiceUpdateWithWhereUniqueWithoutSupplierInput | InvoiceUpdateWithWhereUniqueWithoutSupplierInput[]
    updateMany?: InvoiceUpdateManyWithWhereWithoutSupplierInput | InvoiceUpdateManyWithWhereWithoutSupplierInput[]
    deleteMany?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
  }

  export type InvoiceUpdateManyWithoutBuyerNestedInput = {
    create?: XOR<InvoiceCreateWithoutBuyerInput, InvoiceUncheckedCreateWithoutBuyerInput> | InvoiceCreateWithoutBuyerInput[] | InvoiceUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutBuyerInput | InvoiceCreateOrConnectWithoutBuyerInput[]
    upsert?: InvoiceUpsertWithWhereUniqueWithoutBuyerInput | InvoiceUpsertWithWhereUniqueWithoutBuyerInput[]
    createMany?: InvoiceCreateManyBuyerInputEnvelope
    set?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    disconnect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    delete?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    update?: InvoiceUpdateWithWhereUniqueWithoutBuyerInput | InvoiceUpdateWithWhereUniqueWithoutBuyerInput[]
    updateMany?: InvoiceUpdateManyWithWhereWithoutBuyerInput | InvoiceUpdateManyWithWhereWithoutBuyerInput[]
    deleteMany?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
  }

  export type InvoiceUncheckedUpdateManyWithoutSupplierNestedInput = {
    create?: XOR<InvoiceCreateWithoutSupplierInput, InvoiceUncheckedCreateWithoutSupplierInput> | InvoiceCreateWithoutSupplierInput[] | InvoiceUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutSupplierInput | InvoiceCreateOrConnectWithoutSupplierInput[]
    upsert?: InvoiceUpsertWithWhereUniqueWithoutSupplierInput | InvoiceUpsertWithWhereUniqueWithoutSupplierInput[]
    createMany?: InvoiceCreateManySupplierInputEnvelope
    set?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    disconnect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    delete?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    update?: InvoiceUpdateWithWhereUniqueWithoutSupplierInput | InvoiceUpdateWithWhereUniqueWithoutSupplierInput[]
    updateMany?: InvoiceUpdateManyWithWhereWithoutSupplierInput | InvoiceUpdateManyWithWhereWithoutSupplierInput[]
    deleteMany?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
  }

  export type InvoiceUncheckedUpdateManyWithoutBuyerNestedInput = {
    create?: XOR<InvoiceCreateWithoutBuyerInput, InvoiceUncheckedCreateWithoutBuyerInput> | InvoiceCreateWithoutBuyerInput[] | InvoiceUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutBuyerInput | InvoiceCreateOrConnectWithoutBuyerInput[]
    upsert?: InvoiceUpsertWithWhereUniqueWithoutBuyerInput | InvoiceUpsertWithWhereUniqueWithoutBuyerInput[]
    createMany?: InvoiceCreateManyBuyerInputEnvelope
    set?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    disconnect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    delete?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    update?: InvoiceUpdateWithWhereUniqueWithoutBuyerInput | InvoiceUpdateWithWhereUniqueWithoutBuyerInput[]
    updateMany?: InvoiceUpdateManyWithWhereWithoutBuyerInput | InvoiceUpdateManyWithWhereWithoutBuyerInput[]
    deleteMany?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
  }

  export type InvoiceCreateNestedOneWithoutLinesInput = {
    create?: XOR<InvoiceCreateWithoutLinesInput, InvoiceUncheckedCreateWithoutLinesInput>
    connectOrCreate?: InvoiceCreateOrConnectWithoutLinesInput
    connect?: InvoiceWhereUniqueInput
  }

  export type AllowanceChargeCreateNestedManyWithoutLineInput = {
    create?: XOR<AllowanceChargeCreateWithoutLineInput, AllowanceChargeUncheckedCreateWithoutLineInput> | AllowanceChargeCreateWithoutLineInput[] | AllowanceChargeUncheckedCreateWithoutLineInput[]
    connectOrCreate?: AllowanceChargeCreateOrConnectWithoutLineInput | AllowanceChargeCreateOrConnectWithoutLineInput[]
    createMany?: AllowanceChargeCreateManyLineInputEnvelope
    connect?: AllowanceChargeWhereUniqueInput | AllowanceChargeWhereUniqueInput[]
  }

  export type AllowanceChargeUncheckedCreateNestedManyWithoutLineInput = {
    create?: XOR<AllowanceChargeCreateWithoutLineInput, AllowanceChargeUncheckedCreateWithoutLineInput> | AllowanceChargeCreateWithoutLineInput[] | AllowanceChargeUncheckedCreateWithoutLineInput[]
    connectOrCreate?: AllowanceChargeCreateOrConnectWithoutLineInput | AllowanceChargeCreateOrConnectWithoutLineInput[]
    createMany?: AllowanceChargeCreateManyLineInputEnvelope
    connect?: AllowanceChargeWhereUniqueInput | AllowanceChargeWhereUniqueInput[]
  }

  export type InvoiceUpdateOneRequiredWithoutLinesNestedInput = {
    create?: XOR<InvoiceCreateWithoutLinesInput, InvoiceUncheckedCreateWithoutLinesInput>
    connectOrCreate?: InvoiceCreateOrConnectWithoutLinesInput
    upsert?: InvoiceUpsertWithoutLinesInput
    connect?: InvoiceWhereUniqueInput
    update?: XOR<XOR<InvoiceUpdateToOneWithWhereWithoutLinesInput, InvoiceUpdateWithoutLinesInput>, InvoiceUncheckedUpdateWithoutLinesInput>
  }

  export type AllowanceChargeUpdateManyWithoutLineNestedInput = {
    create?: XOR<AllowanceChargeCreateWithoutLineInput, AllowanceChargeUncheckedCreateWithoutLineInput> | AllowanceChargeCreateWithoutLineInput[] | AllowanceChargeUncheckedCreateWithoutLineInput[]
    connectOrCreate?: AllowanceChargeCreateOrConnectWithoutLineInput | AllowanceChargeCreateOrConnectWithoutLineInput[]
    upsert?: AllowanceChargeUpsertWithWhereUniqueWithoutLineInput | AllowanceChargeUpsertWithWhereUniqueWithoutLineInput[]
    createMany?: AllowanceChargeCreateManyLineInputEnvelope
    set?: AllowanceChargeWhereUniqueInput | AllowanceChargeWhereUniqueInput[]
    disconnect?: AllowanceChargeWhereUniqueInput | AllowanceChargeWhereUniqueInput[]
    delete?: AllowanceChargeWhereUniqueInput | AllowanceChargeWhereUniqueInput[]
    connect?: AllowanceChargeWhereUniqueInput | AllowanceChargeWhereUniqueInput[]
    update?: AllowanceChargeUpdateWithWhereUniqueWithoutLineInput | AllowanceChargeUpdateWithWhereUniqueWithoutLineInput[]
    updateMany?: AllowanceChargeUpdateManyWithWhereWithoutLineInput | AllowanceChargeUpdateManyWithWhereWithoutLineInput[]
    deleteMany?: AllowanceChargeScalarWhereInput | AllowanceChargeScalarWhereInput[]
  }

  export type AllowanceChargeUncheckedUpdateManyWithoutLineNestedInput = {
    create?: XOR<AllowanceChargeCreateWithoutLineInput, AllowanceChargeUncheckedCreateWithoutLineInput> | AllowanceChargeCreateWithoutLineInput[] | AllowanceChargeUncheckedCreateWithoutLineInput[]
    connectOrCreate?: AllowanceChargeCreateOrConnectWithoutLineInput | AllowanceChargeCreateOrConnectWithoutLineInput[]
    upsert?: AllowanceChargeUpsertWithWhereUniqueWithoutLineInput | AllowanceChargeUpsertWithWhereUniqueWithoutLineInput[]
    createMany?: AllowanceChargeCreateManyLineInputEnvelope
    set?: AllowanceChargeWhereUniqueInput | AllowanceChargeWhereUniqueInput[]
    disconnect?: AllowanceChargeWhereUniqueInput | AllowanceChargeWhereUniqueInput[]
    delete?: AllowanceChargeWhereUniqueInput | AllowanceChargeWhereUniqueInput[]
    connect?: AllowanceChargeWhereUniqueInput | AllowanceChargeWhereUniqueInput[]
    update?: AllowanceChargeUpdateWithWhereUniqueWithoutLineInput | AllowanceChargeUpdateWithWhereUniqueWithoutLineInput[]
    updateMany?: AllowanceChargeUpdateManyWithWhereWithoutLineInput | AllowanceChargeUpdateManyWithWhereWithoutLineInput[]
    deleteMany?: AllowanceChargeScalarWhereInput | AllowanceChargeScalarWhereInput[]
  }

  export type InvoiceCreateNestedOneWithoutAllowancesInput = {
    create?: XOR<InvoiceCreateWithoutAllowancesInput, InvoiceUncheckedCreateWithoutAllowancesInput>
    connectOrCreate?: InvoiceCreateOrConnectWithoutAllowancesInput
    connect?: InvoiceWhereUniqueInput
  }

  export type InvoiceLineCreateNestedOneWithoutAllowancesInput = {
    create?: XOR<InvoiceLineCreateWithoutAllowancesInput, InvoiceLineUncheckedCreateWithoutAllowancesInput>
    connectOrCreate?: InvoiceLineCreateOrConnectWithoutAllowancesInput
    connect?: InvoiceLineWhereUniqueInput
  }

  export type InvoiceUpdateOneWithoutAllowancesNestedInput = {
    create?: XOR<InvoiceCreateWithoutAllowancesInput, InvoiceUncheckedCreateWithoutAllowancesInput>
    connectOrCreate?: InvoiceCreateOrConnectWithoutAllowancesInput
    upsert?: InvoiceUpsertWithoutAllowancesInput
    disconnect?: InvoiceWhereInput | boolean
    delete?: InvoiceWhereInput | boolean
    connect?: InvoiceWhereUniqueInput
    update?: XOR<XOR<InvoiceUpdateToOneWithWhereWithoutAllowancesInput, InvoiceUpdateWithoutAllowancesInput>, InvoiceUncheckedUpdateWithoutAllowancesInput>
  }

  export type InvoiceLineUpdateOneWithoutAllowancesNestedInput = {
    create?: XOR<InvoiceLineCreateWithoutAllowancesInput, InvoiceLineUncheckedCreateWithoutAllowancesInput>
    connectOrCreate?: InvoiceLineCreateOrConnectWithoutAllowancesInput
    upsert?: InvoiceLineUpsertWithoutAllowancesInput
    disconnect?: InvoiceLineWhereInput | boolean
    delete?: InvoiceLineWhereInput | boolean
    connect?: InvoiceLineWhereUniqueInput
    update?: XOR<XOR<InvoiceLineUpdateToOneWithWhereWithoutAllowancesInput, InvoiceLineUpdateWithoutAllowancesInput>, InvoiceLineUncheckedUpdateWithoutAllowancesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type InvoiceCreateWithoutUserInput = {
    id?: string
    documentType: string
    documentNumber: string
    invoiceDate: Date | string
    dueDate?: Date | string | null
    deliveryDate?: Date | string | null
    dispatchDate?: Date | string | null
    paymentDate?: Date | string | null
    signatureDate?: string | null
    otherDate?: Date | string | null
    periodStart?: Date | string | null
    periodEnd?: Date | string | null
    operationNature: string
    currency?: string
    orderReference?: string | null
    contractReference?: string | null
    deliveryNoteReference?: string | null
    globalDiscount?: number
    stampDuty?: number
    ttnReference?: string | null
    paymentMeans: string
    bankName?: string | null
    bankCode?: string | null
    bankRib?: string | null
    bankAccountOwner?: string | null
    checkNumber?: string | null
    cardType?: string | null
    cardLast4?: string | null
    cardReference?: string | null
    postalAccountNumber?: string | null
    postalAccountOwner?: string | null
    postalBranchCode?: string | null
    postalServiceName?: string | null
    ePaymentGateway?: string | null
    ePaymentTransactionId?: string | null
    otherPaymentDescription?: string | null
    otherPaymentReference?: string | null
    ircRate?: number | null
    ircAmount?: number | null
    ircExemptionReason?: string | null
    qrCodeEnabled?: boolean
    qrCodeContent?: string | null
    amountDescriptionOverride?: string | null
    amountLanguage?: string
    xmlContent: string
    status?: string
    totalHT?: number
    totalTVA?: number
    totalTTC?: number
    deletedAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    supplier: PartnerCreateNestedOneWithoutSupplierInvoicesInput
    buyer: PartnerCreateNestedOneWithoutBuyerInvoicesInput
    lines?: InvoiceLineCreateNestedManyWithoutInvoiceInput
    allowances?: AllowanceChargeCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceUncheckedCreateWithoutUserInput = {
    id?: string
    documentType: string
    documentNumber: string
    invoiceDate: Date | string
    dueDate?: Date | string | null
    deliveryDate?: Date | string | null
    dispatchDate?: Date | string | null
    paymentDate?: Date | string | null
    signatureDate?: string | null
    otherDate?: Date | string | null
    periodStart?: Date | string | null
    periodEnd?: Date | string | null
    operationNature: string
    currency?: string
    orderReference?: string | null
    contractReference?: string | null
    deliveryNoteReference?: string | null
    supplierId: string
    buyerId: string
    globalDiscount?: number
    stampDuty?: number
    ttnReference?: string | null
    paymentMeans: string
    bankName?: string | null
    bankCode?: string | null
    bankRib?: string | null
    bankAccountOwner?: string | null
    checkNumber?: string | null
    cardType?: string | null
    cardLast4?: string | null
    cardReference?: string | null
    postalAccountNumber?: string | null
    postalAccountOwner?: string | null
    postalBranchCode?: string | null
    postalServiceName?: string | null
    ePaymentGateway?: string | null
    ePaymentTransactionId?: string | null
    otherPaymentDescription?: string | null
    otherPaymentReference?: string | null
    ircRate?: number | null
    ircAmount?: number | null
    ircExemptionReason?: string | null
    qrCodeEnabled?: boolean
    qrCodeContent?: string | null
    amountDescriptionOverride?: string | null
    amountLanguage?: string
    xmlContent: string
    status?: string
    totalHT?: number
    totalTVA?: number
    totalTTC?: number
    deletedAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lines?: InvoiceLineUncheckedCreateNestedManyWithoutInvoiceInput
    allowances?: AllowanceChargeUncheckedCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceCreateOrConnectWithoutUserInput = {
    where: InvoiceWhereUniqueInput
    create: XOR<InvoiceCreateWithoutUserInput, InvoiceUncheckedCreateWithoutUserInput>
  }

  export type InvoiceCreateManyUserInputEnvelope = {
    data: InvoiceCreateManyUserInput | InvoiceCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RefreshTokenCreateWithoutUserInput = {
    id?: string
    tokenHash: string
    expiresAt: Date | string
    createdAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type RefreshTokenUncheckedCreateWithoutUserInput = {
    id?: string
    tokenHash: string
    expiresAt: Date | string
    createdAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type RefreshTokenCreateOrConnectWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenCreateManyUserInputEnvelope = {
    data: RefreshTokenCreateManyUserInput | RefreshTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserSignatureCreateWithoutUserInput = {
    id?: string
    certificateFilename: string
    encryptedContent: string
    signaturePinHash: string
    certificateSubject?: string | null
    certificateIssuer?: string | null
    certificateSerialNumber?: string | null
    certificateValidFrom?: Date | string | null
    certificateValidUntil?: Date | string | null
    keyAlgorithm?: string | null
    status?: string
    uploadedAt?: Date | string
    lastUsedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSignatureUncheckedCreateWithoutUserInput = {
    id?: string
    certificateFilename: string
    encryptedContent: string
    signaturePinHash: string
    certificateSubject?: string | null
    certificateIssuer?: string | null
    certificateSerialNumber?: string | null
    certificateValidFrom?: Date | string | null
    certificateValidUntil?: Date | string | null
    keyAlgorithm?: string | null
    status?: string
    uploadedAt?: Date | string
    lastUsedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSignatureCreateOrConnectWithoutUserInput = {
    where: UserSignatureWhereUniqueInput
    create: XOR<UserSignatureCreateWithoutUserInput, UserSignatureUncheckedCreateWithoutUserInput>
  }

  export type InvoiceUpsertWithWhereUniqueWithoutUserInput = {
    where: InvoiceWhereUniqueInput
    update: XOR<InvoiceUpdateWithoutUserInput, InvoiceUncheckedUpdateWithoutUserInput>
    create: XOR<InvoiceCreateWithoutUserInput, InvoiceUncheckedCreateWithoutUserInput>
  }

  export type InvoiceUpdateWithWhereUniqueWithoutUserInput = {
    where: InvoiceWhereUniqueInput
    data: XOR<InvoiceUpdateWithoutUserInput, InvoiceUncheckedUpdateWithoutUserInput>
  }

  export type InvoiceUpdateManyWithWhereWithoutUserInput = {
    where: InvoiceScalarWhereInput
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyWithoutUserInput>
  }

  export type InvoiceScalarWhereInput = {
    AND?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
    OR?: InvoiceScalarWhereInput[]
    NOT?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
    id?: StringFilter<"Invoice"> | string
    documentType?: StringFilter<"Invoice"> | string
    documentNumber?: StringFilter<"Invoice"> | string
    invoiceDate?: DateTimeFilter<"Invoice"> | Date | string
    dueDate?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    deliveryDate?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    dispatchDate?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    paymentDate?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    signatureDate?: StringNullableFilter<"Invoice"> | string | null
    otherDate?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    periodStart?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    periodEnd?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    operationNature?: StringFilter<"Invoice"> | string
    currency?: StringFilter<"Invoice"> | string
    orderReference?: StringNullableFilter<"Invoice"> | string | null
    contractReference?: StringNullableFilter<"Invoice"> | string | null
    deliveryNoteReference?: StringNullableFilter<"Invoice"> | string | null
    userId?: StringFilter<"Invoice"> | string
    supplierId?: StringFilter<"Invoice"> | string
    buyerId?: StringFilter<"Invoice"> | string
    globalDiscount?: FloatFilter<"Invoice"> | number
    stampDuty?: FloatFilter<"Invoice"> | number
    ttnReference?: StringNullableFilter<"Invoice"> | string | null
    paymentMeans?: StringFilter<"Invoice"> | string
    bankName?: StringNullableFilter<"Invoice"> | string | null
    bankCode?: StringNullableFilter<"Invoice"> | string | null
    bankRib?: StringNullableFilter<"Invoice"> | string | null
    bankAccountOwner?: StringNullableFilter<"Invoice"> | string | null
    checkNumber?: StringNullableFilter<"Invoice"> | string | null
    cardType?: StringNullableFilter<"Invoice"> | string | null
    cardLast4?: StringNullableFilter<"Invoice"> | string | null
    cardReference?: StringNullableFilter<"Invoice"> | string | null
    postalAccountNumber?: StringNullableFilter<"Invoice"> | string | null
    postalAccountOwner?: StringNullableFilter<"Invoice"> | string | null
    postalBranchCode?: StringNullableFilter<"Invoice"> | string | null
    postalServiceName?: StringNullableFilter<"Invoice"> | string | null
    ePaymentGateway?: StringNullableFilter<"Invoice"> | string | null
    ePaymentTransactionId?: StringNullableFilter<"Invoice"> | string | null
    otherPaymentDescription?: StringNullableFilter<"Invoice"> | string | null
    otherPaymentReference?: StringNullableFilter<"Invoice"> | string | null
    ircRate?: FloatNullableFilter<"Invoice"> | number | null
    ircAmount?: FloatNullableFilter<"Invoice"> | number | null
    ircExemptionReason?: StringNullableFilter<"Invoice"> | string | null
    qrCodeEnabled?: BoolFilter<"Invoice"> | boolean
    qrCodeContent?: StringNullableFilter<"Invoice"> | string | null
    amountDescriptionOverride?: StringNullableFilter<"Invoice"> | string | null
    amountLanguage?: StringFilter<"Invoice"> | string
    xmlContent?: StringFilter<"Invoice"> | string
    status?: StringFilter<"Invoice"> | string
    totalHT?: FloatFilter<"Invoice"> | number
    totalTVA?: FloatFilter<"Invoice"> | number
    totalTTC?: FloatFilter<"Invoice"> | number
    deletedAt?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    metadata?: JsonNullableFilter<"Invoice">
    createdAt?: DateTimeFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeFilter<"Invoice"> | Date | string
  }

  export type RefreshTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    update: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    data: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
  }

  export type RefreshTokenUpdateManyWithWhereWithoutUserInput = {
    where: RefreshTokenScalarWhereInput
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type RefreshTokenScalarWhereInput = {
    AND?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    OR?: RefreshTokenScalarWhereInput[]
    NOT?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    userId?: StringFilter<"RefreshToken"> | string
    tokenHash?: StringFilter<"RefreshToken"> | string
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    revokedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
  }

  export type UserSignatureUpsertWithoutUserInput = {
    update: XOR<UserSignatureUpdateWithoutUserInput, UserSignatureUncheckedUpdateWithoutUserInput>
    create: XOR<UserSignatureCreateWithoutUserInput, UserSignatureUncheckedCreateWithoutUserInput>
    where?: UserSignatureWhereInput
  }

  export type UserSignatureUpdateToOneWithWhereWithoutUserInput = {
    where?: UserSignatureWhereInput
    data: XOR<UserSignatureUpdateWithoutUserInput, UserSignatureUncheckedUpdateWithoutUserInput>
  }

  export type UserSignatureUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    certificateFilename?: StringFieldUpdateOperationsInput | string
    encryptedContent?: StringFieldUpdateOperationsInput | string
    signaturePinHash?: StringFieldUpdateOperationsInput | string
    certificateSubject?: NullableStringFieldUpdateOperationsInput | string | null
    certificateIssuer?: NullableStringFieldUpdateOperationsInput | string | null
    certificateSerialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    certificateValidFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    certificateValidUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    keyAlgorithm?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSignatureUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    certificateFilename?: StringFieldUpdateOperationsInput | string
    encryptedContent?: StringFieldUpdateOperationsInput | string
    signaturePinHash?: StringFieldUpdateOperationsInput | string
    certificateSubject?: NullableStringFieldUpdateOperationsInput | string | null
    certificateIssuer?: NullableStringFieldUpdateOperationsInput | string | null
    certificateSerialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    certificateValidFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    certificateValidUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    keyAlgorithm?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutSignatureInput = {
    id?: string
    email: string
    name: string
    passwordHash: string
    emailVerified?: boolean
    verificationCode?: string | null
    verificationCodeExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoices?: InvoiceCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSignatureInput = {
    id?: string
    email: string
    name: string
    passwordHash: string
    emailVerified?: boolean
    verificationCode?: string | null
    verificationCodeExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoices?: InvoiceUncheckedCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSignatureInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSignatureInput, UserUncheckedCreateWithoutSignatureInput>
  }

  export type UserUpsertWithoutSignatureInput = {
    update: XOR<UserUpdateWithoutSignatureInput, UserUncheckedUpdateWithoutSignatureInput>
    create: XOR<UserCreateWithoutSignatureInput, UserUncheckedCreateWithoutSignatureInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSignatureInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSignatureInput, UserUncheckedUpdateWithoutSignatureInput>
  }

  export type UserUpdateWithoutSignatureInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    verificationCodeExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoices?: InvoiceUpdateManyWithoutUserNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSignatureInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    verificationCodeExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoices?: InvoiceUncheckedUpdateManyWithoutUserNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutRefreshTokensInput = {
    id?: string
    email: string
    name: string
    passwordHash: string
    emailVerified?: boolean
    verificationCode?: string | null
    verificationCodeExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoices?: InvoiceCreateNestedManyWithoutUserInput
    signature?: UserSignatureCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRefreshTokensInput = {
    id?: string
    email: string
    name: string
    passwordHash: string
    emailVerified?: boolean
    verificationCode?: string | null
    verificationCodeExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoices?: InvoiceUncheckedCreateNestedManyWithoutUserInput
    signature?: UserSignatureUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRefreshTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
  }

  export type UserUpsertWithoutRefreshTokensInput = {
    update: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRefreshTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type UserUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    verificationCodeExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoices?: InvoiceUpdateManyWithoutUserNestedInput
    signature?: UserSignatureUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    verificationCodeExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoices?: InvoiceUncheckedUpdateManyWithoutUserNestedInput
    signature?: UserSignatureUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutInvoicesInput = {
    id?: string
    email: string
    name: string
    passwordHash: string
    emailVerified?: boolean
    verificationCode?: string | null
    verificationCodeExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    signature?: UserSignatureCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutInvoicesInput = {
    id?: string
    email: string
    name: string
    passwordHash: string
    emailVerified?: boolean
    verificationCode?: string | null
    verificationCodeExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    signature?: UserSignatureUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutInvoicesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInvoicesInput, UserUncheckedCreateWithoutInvoicesInput>
  }

  export type PartnerCreateWithoutSupplierInvoicesInput = {
    id?: string
    idType: string
    idValue: string
    name: string
    addressDescription?: string | null
    street: string
    city: string
    postalCode: string
    country: string
    rc?: string | null
    capital?: string | null
    phone?: string | null
    email?: string | null
    partnerType?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    buyerInvoices?: InvoiceCreateNestedManyWithoutBuyerInput
  }

  export type PartnerUncheckedCreateWithoutSupplierInvoicesInput = {
    id?: string
    idType: string
    idValue: string
    name: string
    addressDescription?: string | null
    street: string
    city: string
    postalCode: string
    country: string
    rc?: string | null
    capital?: string | null
    phone?: string | null
    email?: string | null
    partnerType?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    buyerInvoices?: InvoiceUncheckedCreateNestedManyWithoutBuyerInput
  }

  export type PartnerCreateOrConnectWithoutSupplierInvoicesInput = {
    where: PartnerWhereUniqueInput
    create: XOR<PartnerCreateWithoutSupplierInvoicesInput, PartnerUncheckedCreateWithoutSupplierInvoicesInput>
  }

  export type PartnerCreateWithoutBuyerInvoicesInput = {
    id?: string
    idType: string
    idValue: string
    name: string
    addressDescription?: string | null
    street: string
    city: string
    postalCode: string
    country: string
    rc?: string | null
    capital?: string | null
    phone?: string | null
    email?: string | null
    partnerType?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    supplierInvoices?: InvoiceCreateNestedManyWithoutSupplierInput
  }

  export type PartnerUncheckedCreateWithoutBuyerInvoicesInput = {
    id?: string
    idType: string
    idValue: string
    name: string
    addressDescription?: string | null
    street: string
    city: string
    postalCode: string
    country: string
    rc?: string | null
    capital?: string | null
    phone?: string | null
    email?: string | null
    partnerType?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    supplierInvoices?: InvoiceUncheckedCreateNestedManyWithoutSupplierInput
  }

  export type PartnerCreateOrConnectWithoutBuyerInvoicesInput = {
    where: PartnerWhereUniqueInput
    create: XOR<PartnerCreateWithoutBuyerInvoicesInput, PartnerUncheckedCreateWithoutBuyerInvoicesInput>
  }

  export type InvoiceLineCreateWithoutInvoiceInput = {
    id?: string
    itemCode: string
    description: string
    quantity: number
    unit: string
    unitPrice: number
    discountRate?: number
    taxRate: number
    fodec?: boolean
    exemptionReason?: string | null
    lineAmount: number
    taxAmount: number
    totalAmount: number
    createdAt?: Date | string
    updatedAt?: Date | string
    allowances?: AllowanceChargeCreateNestedManyWithoutLineInput
  }

  export type InvoiceLineUncheckedCreateWithoutInvoiceInput = {
    id?: string
    itemCode: string
    description: string
    quantity: number
    unit: string
    unitPrice: number
    discountRate?: number
    taxRate: number
    fodec?: boolean
    exemptionReason?: string | null
    lineAmount: number
    taxAmount: number
    totalAmount: number
    createdAt?: Date | string
    updatedAt?: Date | string
    allowances?: AllowanceChargeUncheckedCreateNestedManyWithoutLineInput
  }

  export type InvoiceLineCreateOrConnectWithoutInvoiceInput = {
    where: InvoiceLineWhereUniqueInput
    create: XOR<InvoiceLineCreateWithoutInvoiceInput, InvoiceLineUncheckedCreateWithoutInvoiceInput>
  }

  export type InvoiceLineCreateManyInvoiceInputEnvelope = {
    data: InvoiceLineCreateManyInvoiceInput | InvoiceLineCreateManyInvoiceInput[]
    skipDuplicates?: boolean
  }

  export type AllowanceChargeCreateWithoutInvoiceInput = {
    id?: string
    type: string
    code: string
    description: string
    amount: number
    basedOn?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    line?: InvoiceLineCreateNestedOneWithoutAllowancesInput
  }

  export type AllowanceChargeUncheckedCreateWithoutInvoiceInput = {
    id?: string
    type: string
    code: string
    description: string
    amount: number
    basedOn?: string | null
    lineId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AllowanceChargeCreateOrConnectWithoutInvoiceInput = {
    where: AllowanceChargeWhereUniqueInput
    create: XOR<AllowanceChargeCreateWithoutInvoiceInput, AllowanceChargeUncheckedCreateWithoutInvoiceInput>
  }

  export type AllowanceChargeCreateManyInvoiceInputEnvelope = {
    data: AllowanceChargeCreateManyInvoiceInput | AllowanceChargeCreateManyInvoiceInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutInvoicesInput = {
    update: XOR<UserUpdateWithoutInvoicesInput, UserUncheckedUpdateWithoutInvoicesInput>
    create: XOR<UserCreateWithoutInvoicesInput, UserUncheckedCreateWithoutInvoicesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInvoicesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInvoicesInput, UserUncheckedUpdateWithoutInvoicesInput>
  }

  export type UserUpdateWithoutInvoicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    verificationCodeExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    signature?: UserSignatureUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutInvoicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    verificationCodeExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    signature?: UserSignatureUncheckedUpdateOneWithoutUserNestedInput
  }

  export type PartnerUpsertWithoutSupplierInvoicesInput = {
    update: XOR<PartnerUpdateWithoutSupplierInvoicesInput, PartnerUncheckedUpdateWithoutSupplierInvoicesInput>
    create: XOR<PartnerCreateWithoutSupplierInvoicesInput, PartnerUncheckedCreateWithoutSupplierInvoicesInput>
    where?: PartnerWhereInput
  }

  export type PartnerUpdateToOneWithWhereWithoutSupplierInvoicesInput = {
    where?: PartnerWhereInput
    data: XOR<PartnerUpdateWithoutSupplierInvoicesInput, PartnerUncheckedUpdateWithoutSupplierInvoicesInput>
  }

  export type PartnerUpdateWithoutSupplierInvoicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    idType?: StringFieldUpdateOperationsInput | string
    idValue?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    addressDescription?: NullableStringFieldUpdateOperationsInput | string | null
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    rc?: NullableStringFieldUpdateOperationsInput | string | null
    capital?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    partnerType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    buyerInvoices?: InvoiceUpdateManyWithoutBuyerNestedInput
  }

  export type PartnerUncheckedUpdateWithoutSupplierInvoicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    idType?: StringFieldUpdateOperationsInput | string
    idValue?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    addressDescription?: NullableStringFieldUpdateOperationsInput | string | null
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    rc?: NullableStringFieldUpdateOperationsInput | string | null
    capital?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    partnerType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    buyerInvoices?: InvoiceUncheckedUpdateManyWithoutBuyerNestedInput
  }

  export type PartnerUpsertWithoutBuyerInvoicesInput = {
    update: XOR<PartnerUpdateWithoutBuyerInvoicesInput, PartnerUncheckedUpdateWithoutBuyerInvoicesInput>
    create: XOR<PartnerCreateWithoutBuyerInvoicesInput, PartnerUncheckedCreateWithoutBuyerInvoicesInput>
    where?: PartnerWhereInput
  }

  export type PartnerUpdateToOneWithWhereWithoutBuyerInvoicesInput = {
    where?: PartnerWhereInput
    data: XOR<PartnerUpdateWithoutBuyerInvoicesInput, PartnerUncheckedUpdateWithoutBuyerInvoicesInput>
  }

  export type PartnerUpdateWithoutBuyerInvoicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    idType?: StringFieldUpdateOperationsInput | string
    idValue?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    addressDescription?: NullableStringFieldUpdateOperationsInput | string | null
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    rc?: NullableStringFieldUpdateOperationsInput | string | null
    capital?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    partnerType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supplierInvoices?: InvoiceUpdateManyWithoutSupplierNestedInput
  }

  export type PartnerUncheckedUpdateWithoutBuyerInvoicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    idType?: StringFieldUpdateOperationsInput | string
    idValue?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    addressDescription?: NullableStringFieldUpdateOperationsInput | string | null
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    rc?: NullableStringFieldUpdateOperationsInput | string | null
    capital?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    partnerType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supplierInvoices?: InvoiceUncheckedUpdateManyWithoutSupplierNestedInput
  }

  export type InvoiceLineUpsertWithWhereUniqueWithoutInvoiceInput = {
    where: InvoiceLineWhereUniqueInput
    update: XOR<InvoiceLineUpdateWithoutInvoiceInput, InvoiceLineUncheckedUpdateWithoutInvoiceInput>
    create: XOR<InvoiceLineCreateWithoutInvoiceInput, InvoiceLineUncheckedCreateWithoutInvoiceInput>
  }

  export type InvoiceLineUpdateWithWhereUniqueWithoutInvoiceInput = {
    where: InvoiceLineWhereUniqueInput
    data: XOR<InvoiceLineUpdateWithoutInvoiceInput, InvoiceLineUncheckedUpdateWithoutInvoiceInput>
  }

  export type InvoiceLineUpdateManyWithWhereWithoutInvoiceInput = {
    where: InvoiceLineScalarWhereInput
    data: XOR<InvoiceLineUpdateManyMutationInput, InvoiceLineUncheckedUpdateManyWithoutInvoiceInput>
  }

  export type InvoiceLineScalarWhereInput = {
    AND?: InvoiceLineScalarWhereInput | InvoiceLineScalarWhereInput[]
    OR?: InvoiceLineScalarWhereInput[]
    NOT?: InvoiceLineScalarWhereInput | InvoiceLineScalarWhereInput[]
    id?: StringFilter<"InvoiceLine"> | string
    invoiceId?: StringFilter<"InvoiceLine"> | string
    itemCode?: StringFilter<"InvoiceLine"> | string
    description?: StringFilter<"InvoiceLine"> | string
    quantity?: FloatFilter<"InvoiceLine"> | number
    unit?: StringFilter<"InvoiceLine"> | string
    unitPrice?: FloatFilter<"InvoiceLine"> | number
    discountRate?: FloatFilter<"InvoiceLine"> | number
    taxRate?: FloatFilter<"InvoiceLine"> | number
    fodec?: BoolFilter<"InvoiceLine"> | boolean
    exemptionReason?: StringNullableFilter<"InvoiceLine"> | string | null
    lineAmount?: FloatFilter<"InvoiceLine"> | number
    taxAmount?: FloatFilter<"InvoiceLine"> | number
    totalAmount?: FloatFilter<"InvoiceLine"> | number
    createdAt?: DateTimeFilter<"InvoiceLine"> | Date | string
    updatedAt?: DateTimeFilter<"InvoiceLine"> | Date | string
  }

  export type AllowanceChargeUpsertWithWhereUniqueWithoutInvoiceInput = {
    where: AllowanceChargeWhereUniqueInput
    update: XOR<AllowanceChargeUpdateWithoutInvoiceInput, AllowanceChargeUncheckedUpdateWithoutInvoiceInput>
    create: XOR<AllowanceChargeCreateWithoutInvoiceInput, AllowanceChargeUncheckedCreateWithoutInvoiceInput>
  }

  export type AllowanceChargeUpdateWithWhereUniqueWithoutInvoiceInput = {
    where: AllowanceChargeWhereUniqueInput
    data: XOR<AllowanceChargeUpdateWithoutInvoiceInput, AllowanceChargeUncheckedUpdateWithoutInvoiceInput>
  }

  export type AllowanceChargeUpdateManyWithWhereWithoutInvoiceInput = {
    where: AllowanceChargeScalarWhereInput
    data: XOR<AllowanceChargeUpdateManyMutationInput, AllowanceChargeUncheckedUpdateManyWithoutInvoiceInput>
  }

  export type AllowanceChargeScalarWhereInput = {
    AND?: AllowanceChargeScalarWhereInput | AllowanceChargeScalarWhereInput[]
    OR?: AllowanceChargeScalarWhereInput[]
    NOT?: AllowanceChargeScalarWhereInput | AllowanceChargeScalarWhereInput[]
    id?: StringFilter<"AllowanceCharge"> | string
    type?: StringFilter<"AllowanceCharge"> | string
    code?: StringFilter<"AllowanceCharge"> | string
    description?: StringFilter<"AllowanceCharge"> | string
    amount?: FloatFilter<"AllowanceCharge"> | number
    basedOn?: StringNullableFilter<"AllowanceCharge"> | string | null
    invoiceId?: StringNullableFilter<"AllowanceCharge"> | string | null
    lineId?: StringNullableFilter<"AllowanceCharge"> | string | null
    createdAt?: DateTimeFilter<"AllowanceCharge"> | Date | string
    updatedAt?: DateTimeFilter<"AllowanceCharge"> | Date | string
  }

  export type InvoiceCreateWithoutSupplierInput = {
    id?: string
    documentType: string
    documentNumber: string
    invoiceDate: Date | string
    dueDate?: Date | string | null
    deliveryDate?: Date | string | null
    dispatchDate?: Date | string | null
    paymentDate?: Date | string | null
    signatureDate?: string | null
    otherDate?: Date | string | null
    periodStart?: Date | string | null
    periodEnd?: Date | string | null
    operationNature: string
    currency?: string
    orderReference?: string | null
    contractReference?: string | null
    deliveryNoteReference?: string | null
    globalDiscount?: number
    stampDuty?: number
    ttnReference?: string | null
    paymentMeans: string
    bankName?: string | null
    bankCode?: string | null
    bankRib?: string | null
    bankAccountOwner?: string | null
    checkNumber?: string | null
    cardType?: string | null
    cardLast4?: string | null
    cardReference?: string | null
    postalAccountNumber?: string | null
    postalAccountOwner?: string | null
    postalBranchCode?: string | null
    postalServiceName?: string | null
    ePaymentGateway?: string | null
    ePaymentTransactionId?: string | null
    otherPaymentDescription?: string | null
    otherPaymentReference?: string | null
    ircRate?: number | null
    ircAmount?: number | null
    ircExemptionReason?: string | null
    qrCodeEnabled?: boolean
    qrCodeContent?: string | null
    amountDescriptionOverride?: string | null
    amountLanguage?: string
    xmlContent: string
    status?: string
    totalHT?: number
    totalTVA?: number
    totalTTC?: number
    deletedAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutInvoicesInput
    buyer: PartnerCreateNestedOneWithoutBuyerInvoicesInput
    lines?: InvoiceLineCreateNestedManyWithoutInvoiceInput
    allowances?: AllowanceChargeCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceUncheckedCreateWithoutSupplierInput = {
    id?: string
    documentType: string
    documentNumber: string
    invoiceDate: Date | string
    dueDate?: Date | string | null
    deliveryDate?: Date | string | null
    dispatchDate?: Date | string | null
    paymentDate?: Date | string | null
    signatureDate?: string | null
    otherDate?: Date | string | null
    periodStart?: Date | string | null
    periodEnd?: Date | string | null
    operationNature: string
    currency?: string
    orderReference?: string | null
    contractReference?: string | null
    deliveryNoteReference?: string | null
    userId: string
    buyerId: string
    globalDiscount?: number
    stampDuty?: number
    ttnReference?: string | null
    paymentMeans: string
    bankName?: string | null
    bankCode?: string | null
    bankRib?: string | null
    bankAccountOwner?: string | null
    checkNumber?: string | null
    cardType?: string | null
    cardLast4?: string | null
    cardReference?: string | null
    postalAccountNumber?: string | null
    postalAccountOwner?: string | null
    postalBranchCode?: string | null
    postalServiceName?: string | null
    ePaymentGateway?: string | null
    ePaymentTransactionId?: string | null
    otherPaymentDescription?: string | null
    otherPaymentReference?: string | null
    ircRate?: number | null
    ircAmount?: number | null
    ircExemptionReason?: string | null
    qrCodeEnabled?: boolean
    qrCodeContent?: string | null
    amountDescriptionOverride?: string | null
    amountLanguage?: string
    xmlContent: string
    status?: string
    totalHT?: number
    totalTVA?: number
    totalTTC?: number
    deletedAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lines?: InvoiceLineUncheckedCreateNestedManyWithoutInvoiceInput
    allowances?: AllowanceChargeUncheckedCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceCreateOrConnectWithoutSupplierInput = {
    where: InvoiceWhereUniqueInput
    create: XOR<InvoiceCreateWithoutSupplierInput, InvoiceUncheckedCreateWithoutSupplierInput>
  }

  export type InvoiceCreateManySupplierInputEnvelope = {
    data: InvoiceCreateManySupplierInput | InvoiceCreateManySupplierInput[]
    skipDuplicates?: boolean
  }

  export type InvoiceCreateWithoutBuyerInput = {
    id?: string
    documentType: string
    documentNumber: string
    invoiceDate: Date | string
    dueDate?: Date | string | null
    deliveryDate?: Date | string | null
    dispatchDate?: Date | string | null
    paymentDate?: Date | string | null
    signatureDate?: string | null
    otherDate?: Date | string | null
    periodStart?: Date | string | null
    periodEnd?: Date | string | null
    operationNature: string
    currency?: string
    orderReference?: string | null
    contractReference?: string | null
    deliveryNoteReference?: string | null
    globalDiscount?: number
    stampDuty?: number
    ttnReference?: string | null
    paymentMeans: string
    bankName?: string | null
    bankCode?: string | null
    bankRib?: string | null
    bankAccountOwner?: string | null
    checkNumber?: string | null
    cardType?: string | null
    cardLast4?: string | null
    cardReference?: string | null
    postalAccountNumber?: string | null
    postalAccountOwner?: string | null
    postalBranchCode?: string | null
    postalServiceName?: string | null
    ePaymentGateway?: string | null
    ePaymentTransactionId?: string | null
    otherPaymentDescription?: string | null
    otherPaymentReference?: string | null
    ircRate?: number | null
    ircAmount?: number | null
    ircExemptionReason?: string | null
    qrCodeEnabled?: boolean
    qrCodeContent?: string | null
    amountDescriptionOverride?: string | null
    amountLanguage?: string
    xmlContent: string
    status?: string
    totalHT?: number
    totalTVA?: number
    totalTTC?: number
    deletedAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutInvoicesInput
    supplier: PartnerCreateNestedOneWithoutSupplierInvoicesInput
    lines?: InvoiceLineCreateNestedManyWithoutInvoiceInput
    allowances?: AllowanceChargeCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceUncheckedCreateWithoutBuyerInput = {
    id?: string
    documentType: string
    documentNumber: string
    invoiceDate: Date | string
    dueDate?: Date | string | null
    deliveryDate?: Date | string | null
    dispatchDate?: Date | string | null
    paymentDate?: Date | string | null
    signatureDate?: string | null
    otherDate?: Date | string | null
    periodStart?: Date | string | null
    periodEnd?: Date | string | null
    operationNature: string
    currency?: string
    orderReference?: string | null
    contractReference?: string | null
    deliveryNoteReference?: string | null
    userId: string
    supplierId: string
    globalDiscount?: number
    stampDuty?: number
    ttnReference?: string | null
    paymentMeans: string
    bankName?: string | null
    bankCode?: string | null
    bankRib?: string | null
    bankAccountOwner?: string | null
    checkNumber?: string | null
    cardType?: string | null
    cardLast4?: string | null
    cardReference?: string | null
    postalAccountNumber?: string | null
    postalAccountOwner?: string | null
    postalBranchCode?: string | null
    postalServiceName?: string | null
    ePaymentGateway?: string | null
    ePaymentTransactionId?: string | null
    otherPaymentDescription?: string | null
    otherPaymentReference?: string | null
    ircRate?: number | null
    ircAmount?: number | null
    ircExemptionReason?: string | null
    qrCodeEnabled?: boolean
    qrCodeContent?: string | null
    amountDescriptionOverride?: string | null
    amountLanguage?: string
    xmlContent: string
    status?: string
    totalHT?: number
    totalTVA?: number
    totalTTC?: number
    deletedAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lines?: InvoiceLineUncheckedCreateNestedManyWithoutInvoiceInput
    allowances?: AllowanceChargeUncheckedCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceCreateOrConnectWithoutBuyerInput = {
    where: InvoiceWhereUniqueInput
    create: XOR<InvoiceCreateWithoutBuyerInput, InvoiceUncheckedCreateWithoutBuyerInput>
  }

  export type InvoiceCreateManyBuyerInputEnvelope = {
    data: InvoiceCreateManyBuyerInput | InvoiceCreateManyBuyerInput[]
    skipDuplicates?: boolean
  }

  export type InvoiceUpsertWithWhereUniqueWithoutSupplierInput = {
    where: InvoiceWhereUniqueInput
    update: XOR<InvoiceUpdateWithoutSupplierInput, InvoiceUncheckedUpdateWithoutSupplierInput>
    create: XOR<InvoiceCreateWithoutSupplierInput, InvoiceUncheckedCreateWithoutSupplierInput>
  }

  export type InvoiceUpdateWithWhereUniqueWithoutSupplierInput = {
    where: InvoiceWhereUniqueInput
    data: XOR<InvoiceUpdateWithoutSupplierInput, InvoiceUncheckedUpdateWithoutSupplierInput>
  }

  export type InvoiceUpdateManyWithWhereWithoutSupplierInput = {
    where: InvoiceScalarWhereInput
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyWithoutSupplierInput>
  }

  export type InvoiceUpsertWithWhereUniqueWithoutBuyerInput = {
    where: InvoiceWhereUniqueInput
    update: XOR<InvoiceUpdateWithoutBuyerInput, InvoiceUncheckedUpdateWithoutBuyerInput>
    create: XOR<InvoiceCreateWithoutBuyerInput, InvoiceUncheckedCreateWithoutBuyerInput>
  }

  export type InvoiceUpdateWithWhereUniqueWithoutBuyerInput = {
    where: InvoiceWhereUniqueInput
    data: XOR<InvoiceUpdateWithoutBuyerInput, InvoiceUncheckedUpdateWithoutBuyerInput>
  }

  export type InvoiceUpdateManyWithWhereWithoutBuyerInput = {
    where: InvoiceScalarWhereInput
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyWithoutBuyerInput>
  }

  export type InvoiceCreateWithoutLinesInput = {
    id?: string
    documentType: string
    documentNumber: string
    invoiceDate: Date | string
    dueDate?: Date | string | null
    deliveryDate?: Date | string | null
    dispatchDate?: Date | string | null
    paymentDate?: Date | string | null
    signatureDate?: string | null
    otherDate?: Date | string | null
    periodStart?: Date | string | null
    periodEnd?: Date | string | null
    operationNature: string
    currency?: string
    orderReference?: string | null
    contractReference?: string | null
    deliveryNoteReference?: string | null
    globalDiscount?: number
    stampDuty?: number
    ttnReference?: string | null
    paymentMeans: string
    bankName?: string | null
    bankCode?: string | null
    bankRib?: string | null
    bankAccountOwner?: string | null
    checkNumber?: string | null
    cardType?: string | null
    cardLast4?: string | null
    cardReference?: string | null
    postalAccountNumber?: string | null
    postalAccountOwner?: string | null
    postalBranchCode?: string | null
    postalServiceName?: string | null
    ePaymentGateway?: string | null
    ePaymentTransactionId?: string | null
    otherPaymentDescription?: string | null
    otherPaymentReference?: string | null
    ircRate?: number | null
    ircAmount?: number | null
    ircExemptionReason?: string | null
    qrCodeEnabled?: boolean
    qrCodeContent?: string | null
    amountDescriptionOverride?: string | null
    amountLanguage?: string
    xmlContent: string
    status?: string
    totalHT?: number
    totalTVA?: number
    totalTTC?: number
    deletedAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutInvoicesInput
    supplier: PartnerCreateNestedOneWithoutSupplierInvoicesInput
    buyer: PartnerCreateNestedOneWithoutBuyerInvoicesInput
    allowances?: AllowanceChargeCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceUncheckedCreateWithoutLinesInput = {
    id?: string
    documentType: string
    documentNumber: string
    invoiceDate: Date | string
    dueDate?: Date | string | null
    deliveryDate?: Date | string | null
    dispatchDate?: Date | string | null
    paymentDate?: Date | string | null
    signatureDate?: string | null
    otherDate?: Date | string | null
    periodStart?: Date | string | null
    periodEnd?: Date | string | null
    operationNature: string
    currency?: string
    orderReference?: string | null
    contractReference?: string | null
    deliveryNoteReference?: string | null
    userId: string
    supplierId: string
    buyerId: string
    globalDiscount?: number
    stampDuty?: number
    ttnReference?: string | null
    paymentMeans: string
    bankName?: string | null
    bankCode?: string | null
    bankRib?: string | null
    bankAccountOwner?: string | null
    checkNumber?: string | null
    cardType?: string | null
    cardLast4?: string | null
    cardReference?: string | null
    postalAccountNumber?: string | null
    postalAccountOwner?: string | null
    postalBranchCode?: string | null
    postalServiceName?: string | null
    ePaymentGateway?: string | null
    ePaymentTransactionId?: string | null
    otherPaymentDescription?: string | null
    otherPaymentReference?: string | null
    ircRate?: number | null
    ircAmount?: number | null
    ircExemptionReason?: string | null
    qrCodeEnabled?: boolean
    qrCodeContent?: string | null
    amountDescriptionOverride?: string | null
    amountLanguage?: string
    xmlContent: string
    status?: string
    totalHT?: number
    totalTVA?: number
    totalTTC?: number
    deletedAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    allowances?: AllowanceChargeUncheckedCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceCreateOrConnectWithoutLinesInput = {
    where: InvoiceWhereUniqueInput
    create: XOR<InvoiceCreateWithoutLinesInput, InvoiceUncheckedCreateWithoutLinesInput>
  }

  export type AllowanceChargeCreateWithoutLineInput = {
    id?: string
    type: string
    code: string
    description: string
    amount: number
    basedOn?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoice?: InvoiceCreateNestedOneWithoutAllowancesInput
  }

  export type AllowanceChargeUncheckedCreateWithoutLineInput = {
    id?: string
    type: string
    code: string
    description: string
    amount: number
    basedOn?: string | null
    invoiceId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AllowanceChargeCreateOrConnectWithoutLineInput = {
    where: AllowanceChargeWhereUniqueInput
    create: XOR<AllowanceChargeCreateWithoutLineInput, AllowanceChargeUncheckedCreateWithoutLineInput>
  }

  export type AllowanceChargeCreateManyLineInputEnvelope = {
    data: AllowanceChargeCreateManyLineInput | AllowanceChargeCreateManyLineInput[]
    skipDuplicates?: boolean
  }

  export type InvoiceUpsertWithoutLinesInput = {
    update: XOR<InvoiceUpdateWithoutLinesInput, InvoiceUncheckedUpdateWithoutLinesInput>
    create: XOR<InvoiceCreateWithoutLinesInput, InvoiceUncheckedCreateWithoutLinesInput>
    where?: InvoiceWhereInput
  }

  export type InvoiceUpdateToOneWithWhereWithoutLinesInput = {
    where?: InvoiceWhereInput
    data: XOR<InvoiceUpdateWithoutLinesInput, InvoiceUncheckedUpdateWithoutLinesInput>
  }

  export type InvoiceUpdateWithoutLinesInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dispatchDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    signatureDate?: NullableStringFieldUpdateOperationsInput | string | null
    otherDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    operationNature?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    orderReference?: NullableStringFieldUpdateOperationsInput | string | null
    contractReference?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryNoteReference?: NullableStringFieldUpdateOperationsInput | string | null
    globalDiscount?: FloatFieldUpdateOperationsInput | number
    stampDuty?: FloatFieldUpdateOperationsInput | number
    ttnReference?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMeans?: StringFieldUpdateOperationsInput | string
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankRib?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    checkNumber?: NullableStringFieldUpdateOperationsInput | string | null
    cardType?: NullableStringFieldUpdateOperationsInput | string | null
    cardLast4?: NullableStringFieldUpdateOperationsInput | string | null
    cardReference?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    postalBranchCode?: NullableStringFieldUpdateOperationsInput | string | null
    postalServiceName?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentGateway?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentDescription?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    ircRate?: NullableFloatFieldUpdateOperationsInput | number | null
    ircAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    ircExemptionReason?: NullableStringFieldUpdateOperationsInput | string | null
    qrCodeEnabled?: BoolFieldUpdateOperationsInput | boolean
    qrCodeContent?: NullableStringFieldUpdateOperationsInput | string | null
    amountDescriptionOverride?: NullableStringFieldUpdateOperationsInput | string | null
    amountLanguage?: StringFieldUpdateOperationsInput | string
    xmlContent?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTVA?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInvoicesNestedInput
    supplier?: PartnerUpdateOneRequiredWithoutSupplierInvoicesNestedInput
    buyer?: PartnerUpdateOneRequiredWithoutBuyerInvoicesNestedInput
    allowances?: AllowanceChargeUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateWithoutLinesInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dispatchDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    signatureDate?: NullableStringFieldUpdateOperationsInput | string | null
    otherDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    operationNature?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    orderReference?: NullableStringFieldUpdateOperationsInput | string | null
    contractReference?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryNoteReference?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    supplierId?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    globalDiscount?: FloatFieldUpdateOperationsInput | number
    stampDuty?: FloatFieldUpdateOperationsInput | number
    ttnReference?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMeans?: StringFieldUpdateOperationsInput | string
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankRib?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    checkNumber?: NullableStringFieldUpdateOperationsInput | string | null
    cardType?: NullableStringFieldUpdateOperationsInput | string | null
    cardLast4?: NullableStringFieldUpdateOperationsInput | string | null
    cardReference?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    postalBranchCode?: NullableStringFieldUpdateOperationsInput | string | null
    postalServiceName?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentGateway?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentDescription?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    ircRate?: NullableFloatFieldUpdateOperationsInput | number | null
    ircAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    ircExemptionReason?: NullableStringFieldUpdateOperationsInput | string | null
    qrCodeEnabled?: BoolFieldUpdateOperationsInput | boolean
    qrCodeContent?: NullableStringFieldUpdateOperationsInput | string | null
    amountDescriptionOverride?: NullableStringFieldUpdateOperationsInput | string | null
    amountLanguage?: StringFieldUpdateOperationsInput | string
    xmlContent?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTVA?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowances?: AllowanceChargeUncheckedUpdateManyWithoutInvoiceNestedInput
  }

  export type AllowanceChargeUpsertWithWhereUniqueWithoutLineInput = {
    where: AllowanceChargeWhereUniqueInput
    update: XOR<AllowanceChargeUpdateWithoutLineInput, AllowanceChargeUncheckedUpdateWithoutLineInput>
    create: XOR<AllowanceChargeCreateWithoutLineInput, AllowanceChargeUncheckedCreateWithoutLineInput>
  }

  export type AllowanceChargeUpdateWithWhereUniqueWithoutLineInput = {
    where: AllowanceChargeWhereUniqueInput
    data: XOR<AllowanceChargeUpdateWithoutLineInput, AllowanceChargeUncheckedUpdateWithoutLineInput>
  }

  export type AllowanceChargeUpdateManyWithWhereWithoutLineInput = {
    where: AllowanceChargeScalarWhereInput
    data: XOR<AllowanceChargeUpdateManyMutationInput, AllowanceChargeUncheckedUpdateManyWithoutLineInput>
  }

  export type InvoiceCreateWithoutAllowancesInput = {
    id?: string
    documentType: string
    documentNumber: string
    invoiceDate: Date | string
    dueDate?: Date | string | null
    deliveryDate?: Date | string | null
    dispatchDate?: Date | string | null
    paymentDate?: Date | string | null
    signatureDate?: string | null
    otherDate?: Date | string | null
    periodStart?: Date | string | null
    periodEnd?: Date | string | null
    operationNature: string
    currency?: string
    orderReference?: string | null
    contractReference?: string | null
    deliveryNoteReference?: string | null
    globalDiscount?: number
    stampDuty?: number
    ttnReference?: string | null
    paymentMeans: string
    bankName?: string | null
    bankCode?: string | null
    bankRib?: string | null
    bankAccountOwner?: string | null
    checkNumber?: string | null
    cardType?: string | null
    cardLast4?: string | null
    cardReference?: string | null
    postalAccountNumber?: string | null
    postalAccountOwner?: string | null
    postalBranchCode?: string | null
    postalServiceName?: string | null
    ePaymentGateway?: string | null
    ePaymentTransactionId?: string | null
    otherPaymentDescription?: string | null
    otherPaymentReference?: string | null
    ircRate?: number | null
    ircAmount?: number | null
    ircExemptionReason?: string | null
    qrCodeEnabled?: boolean
    qrCodeContent?: string | null
    amountDescriptionOverride?: string | null
    amountLanguage?: string
    xmlContent: string
    status?: string
    totalHT?: number
    totalTVA?: number
    totalTTC?: number
    deletedAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutInvoicesInput
    supplier: PartnerCreateNestedOneWithoutSupplierInvoicesInput
    buyer: PartnerCreateNestedOneWithoutBuyerInvoicesInput
    lines?: InvoiceLineCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceUncheckedCreateWithoutAllowancesInput = {
    id?: string
    documentType: string
    documentNumber: string
    invoiceDate: Date | string
    dueDate?: Date | string | null
    deliveryDate?: Date | string | null
    dispatchDate?: Date | string | null
    paymentDate?: Date | string | null
    signatureDate?: string | null
    otherDate?: Date | string | null
    periodStart?: Date | string | null
    periodEnd?: Date | string | null
    operationNature: string
    currency?: string
    orderReference?: string | null
    contractReference?: string | null
    deliveryNoteReference?: string | null
    userId: string
    supplierId: string
    buyerId: string
    globalDiscount?: number
    stampDuty?: number
    ttnReference?: string | null
    paymentMeans: string
    bankName?: string | null
    bankCode?: string | null
    bankRib?: string | null
    bankAccountOwner?: string | null
    checkNumber?: string | null
    cardType?: string | null
    cardLast4?: string | null
    cardReference?: string | null
    postalAccountNumber?: string | null
    postalAccountOwner?: string | null
    postalBranchCode?: string | null
    postalServiceName?: string | null
    ePaymentGateway?: string | null
    ePaymentTransactionId?: string | null
    otherPaymentDescription?: string | null
    otherPaymentReference?: string | null
    ircRate?: number | null
    ircAmount?: number | null
    ircExemptionReason?: string | null
    qrCodeEnabled?: boolean
    qrCodeContent?: string | null
    amountDescriptionOverride?: string | null
    amountLanguage?: string
    xmlContent: string
    status?: string
    totalHT?: number
    totalTVA?: number
    totalTTC?: number
    deletedAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lines?: InvoiceLineUncheckedCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceCreateOrConnectWithoutAllowancesInput = {
    where: InvoiceWhereUniqueInput
    create: XOR<InvoiceCreateWithoutAllowancesInput, InvoiceUncheckedCreateWithoutAllowancesInput>
  }

  export type InvoiceLineCreateWithoutAllowancesInput = {
    id?: string
    itemCode: string
    description: string
    quantity: number
    unit: string
    unitPrice: number
    discountRate?: number
    taxRate: number
    fodec?: boolean
    exemptionReason?: string | null
    lineAmount: number
    taxAmount: number
    totalAmount: number
    createdAt?: Date | string
    updatedAt?: Date | string
    invoice: InvoiceCreateNestedOneWithoutLinesInput
  }

  export type InvoiceLineUncheckedCreateWithoutAllowancesInput = {
    id?: string
    invoiceId: string
    itemCode: string
    description: string
    quantity: number
    unit: string
    unitPrice: number
    discountRate?: number
    taxRate: number
    fodec?: boolean
    exemptionReason?: string | null
    lineAmount: number
    taxAmount: number
    totalAmount: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceLineCreateOrConnectWithoutAllowancesInput = {
    where: InvoiceLineWhereUniqueInput
    create: XOR<InvoiceLineCreateWithoutAllowancesInput, InvoiceLineUncheckedCreateWithoutAllowancesInput>
  }

  export type InvoiceUpsertWithoutAllowancesInput = {
    update: XOR<InvoiceUpdateWithoutAllowancesInput, InvoiceUncheckedUpdateWithoutAllowancesInput>
    create: XOR<InvoiceCreateWithoutAllowancesInput, InvoiceUncheckedCreateWithoutAllowancesInput>
    where?: InvoiceWhereInput
  }

  export type InvoiceUpdateToOneWithWhereWithoutAllowancesInput = {
    where?: InvoiceWhereInput
    data: XOR<InvoiceUpdateWithoutAllowancesInput, InvoiceUncheckedUpdateWithoutAllowancesInput>
  }

  export type InvoiceUpdateWithoutAllowancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dispatchDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    signatureDate?: NullableStringFieldUpdateOperationsInput | string | null
    otherDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    operationNature?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    orderReference?: NullableStringFieldUpdateOperationsInput | string | null
    contractReference?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryNoteReference?: NullableStringFieldUpdateOperationsInput | string | null
    globalDiscount?: FloatFieldUpdateOperationsInput | number
    stampDuty?: FloatFieldUpdateOperationsInput | number
    ttnReference?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMeans?: StringFieldUpdateOperationsInput | string
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankRib?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    checkNumber?: NullableStringFieldUpdateOperationsInput | string | null
    cardType?: NullableStringFieldUpdateOperationsInput | string | null
    cardLast4?: NullableStringFieldUpdateOperationsInput | string | null
    cardReference?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    postalBranchCode?: NullableStringFieldUpdateOperationsInput | string | null
    postalServiceName?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentGateway?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentDescription?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    ircRate?: NullableFloatFieldUpdateOperationsInput | number | null
    ircAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    ircExemptionReason?: NullableStringFieldUpdateOperationsInput | string | null
    qrCodeEnabled?: BoolFieldUpdateOperationsInput | boolean
    qrCodeContent?: NullableStringFieldUpdateOperationsInput | string | null
    amountDescriptionOverride?: NullableStringFieldUpdateOperationsInput | string | null
    amountLanguage?: StringFieldUpdateOperationsInput | string
    xmlContent?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTVA?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInvoicesNestedInput
    supplier?: PartnerUpdateOneRequiredWithoutSupplierInvoicesNestedInput
    buyer?: PartnerUpdateOneRequiredWithoutBuyerInvoicesNestedInput
    lines?: InvoiceLineUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateWithoutAllowancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dispatchDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    signatureDate?: NullableStringFieldUpdateOperationsInput | string | null
    otherDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    operationNature?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    orderReference?: NullableStringFieldUpdateOperationsInput | string | null
    contractReference?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryNoteReference?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    supplierId?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    globalDiscount?: FloatFieldUpdateOperationsInput | number
    stampDuty?: FloatFieldUpdateOperationsInput | number
    ttnReference?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMeans?: StringFieldUpdateOperationsInput | string
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankRib?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    checkNumber?: NullableStringFieldUpdateOperationsInput | string | null
    cardType?: NullableStringFieldUpdateOperationsInput | string | null
    cardLast4?: NullableStringFieldUpdateOperationsInput | string | null
    cardReference?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    postalBranchCode?: NullableStringFieldUpdateOperationsInput | string | null
    postalServiceName?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentGateway?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentDescription?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    ircRate?: NullableFloatFieldUpdateOperationsInput | number | null
    ircAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    ircExemptionReason?: NullableStringFieldUpdateOperationsInput | string | null
    qrCodeEnabled?: BoolFieldUpdateOperationsInput | boolean
    qrCodeContent?: NullableStringFieldUpdateOperationsInput | string | null
    amountDescriptionOverride?: NullableStringFieldUpdateOperationsInput | string | null
    amountLanguage?: StringFieldUpdateOperationsInput | string
    xmlContent?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTVA?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lines?: InvoiceLineUncheckedUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceLineUpsertWithoutAllowancesInput = {
    update: XOR<InvoiceLineUpdateWithoutAllowancesInput, InvoiceLineUncheckedUpdateWithoutAllowancesInput>
    create: XOR<InvoiceLineCreateWithoutAllowancesInput, InvoiceLineUncheckedCreateWithoutAllowancesInput>
    where?: InvoiceLineWhereInput
  }

  export type InvoiceLineUpdateToOneWithWhereWithoutAllowancesInput = {
    where?: InvoiceLineWhereInput
    data: XOR<InvoiceLineUpdateWithoutAllowancesInput, InvoiceLineUncheckedUpdateWithoutAllowancesInput>
  }

  export type InvoiceLineUpdateWithoutAllowancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemCode?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    unitPrice?: FloatFieldUpdateOperationsInput | number
    discountRate?: FloatFieldUpdateOperationsInput | number
    taxRate?: FloatFieldUpdateOperationsInput | number
    fodec?: BoolFieldUpdateOperationsInput | boolean
    exemptionReason?: NullableStringFieldUpdateOperationsInput | string | null
    lineAmount?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoice?: InvoiceUpdateOneRequiredWithoutLinesNestedInput
  }

  export type InvoiceLineUncheckedUpdateWithoutAllowancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceId?: StringFieldUpdateOperationsInput | string
    itemCode?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    unitPrice?: FloatFieldUpdateOperationsInput | number
    discountRate?: FloatFieldUpdateOperationsInput | number
    taxRate?: FloatFieldUpdateOperationsInput | number
    fodec?: BoolFieldUpdateOperationsInput | boolean
    exemptionReason?: NullableStringFieldUpdateOperationsInput | string | null
    lineAmount?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceCreateManyUserInput = {
    id?: string
    documentType: string
    documentNumber: string
    invoiceDate: Date | string
    dueDate?: Date | string | null
    deliveryDate?: Date | string | null
    dispatchDate?: Date | string | null
    paymentDate?: Date | string | null
    signatureDate?: string | null
    otherDate?: Date | string | null
    periodStart?: Date | string | null
    periodEnd?: Date | string | null
    operationNature: string
    currency?: string
    orderReference?: string | null
    contractReference?: string | null
    deliveryNoteReference?: string | null
    supplierId: string
    buyerId: string
    globalDiscount?: number
    stampDuty?: number
    ttnReference?: string | null
    paymentMeans: string
    bankName?: string | null
    bankCode?: string | null
    bankRib?: string | null
    bankAccountOwner?: string | null
    checkNumber?: string | null
    cardType?: string | null
    cardLast4?: string | null
    cardReference?: string | null
    postalAccountNumber?: string | null
    postalAccountOwner?: string | null
    postalBranchCode?: string | null
    postalServiceName?: string | null
    ePaymentGateway?: string | null
    ePaymentTransactionId?: string | null
    otherPaymentDescription?: string | null
    otherPaymentReference?: string | null
    ircRate?: number | null
    ircAmount?: number | null
    ircExemptionReason?: string | null
    qrCodeEnabled?: boolean
    qrCodeContent?: string | null
    amountDescriptionOverride?: string | null
    amountLanguage?: string
    xmlContent: string
    status?: string
    totalHT?: number
    totalTVA?: number
    totalTTC?: number
    deletedAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RefreshTokenCreateManyUserInput = {
    id?: string
    tokenHash: string
    expiresAt: Date | string
    createdAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type InvoiceUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dispatchDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    signatureDate?: NullableStringFieldUpdateOperationsInput | string | null
    otherDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    operationNature?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    orderReference?: NullableStringFieldUpdateOperationsInput | string | null
    contractReference?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryNoteReference?: NullableStringFieldUpdateOperationsInput | string | null
    globalDiscount?: FloatFieldUpdateOperationsInput | number
    stampDuty?: FloatFieldUpdateOperationsInput | number
    ttnReference?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMeans?: StringFieldUpdateOperationsInput | string
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankRib?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    checkNumber?: NullableStringFieldUpdateOperationsInput | string | null
    cardType?: NullableStringFieldUpdateOperationsInput | string | null
    cardLast4?: NullableStringFieldUpdateOperationsInput | string | null
    cardReference?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    postalBranchCode?: NullableStringFieldUpdateOperationsInput | string | null
    postalServiceName?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentGateway?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentDescription?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    ircRate?: NullableFloatFieldUpdateOperationsInput | number | null
    ircAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    ircExemptionReason?: NullableStringFieldUpdateOperationsInput | string | null
    qrCodeEnabled?: BoolFieldUpdateOperationsInput | boolean
    qrCodeContent?: NullableStringFieldUpdateOperationsInput | string | null
    amountDescriptionOverride?: NullableStringFieldUpdateOperationsInput | string | null
    amountLanguage?: StringFieldUpdateOperationsInput | string
    xmlContent?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTVA?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supplier?: PartnerUpdateOneRequiredWithoutSupplierInvoicesNestedInput
    buyer?: PartnerUpdateOneRequiredWithoutBuyerInvoicesNestedInput
    lines?: InvoiceLineUpdateManyWithoutInvoiceNestedInput
    allowances?: AllowanceChargeUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dispatchDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    signatureDate?: NullableStringFieldUpdateOperationsInput | string | null
    otherDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    operationNature?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    orderReference?: NullableStringFieldUpdateOperationsInput | string | null
    contractReference?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryNoteReference?: NullableStringFieldUpdateOperationsInput | string | null
    supplierId?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    globalDiscount?: FloatFieldUpdateOperationsInput | number
    stampDuty?: FloatFieldUpdateOperationsInput | number
    ttnReference?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMeans?: StringFieldUpdateOperationsInput | string
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankRib?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    checkNumber?: NullableStringFieldUpdateOperationsInput | string | null
    cardType?: NullableStringFieldUpdateOperationsInput | string | null
    cardLast4?: NullableStringFieldUpdateOperationsInput | string | null
    cardReference?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    postalBranchCode?: NullableStringFieldUpdateOperationsInput | string | null
    postalServiceName?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentGateway?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentDescription?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    ircRate?: NullableFloatFieldUpdateOperationsInput | number | null
    ircAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    ircExemptionReason?: NullableStringFieldUpdateOperationsInput | string | null
    qrCodeEnabled?: BoolFieldUpdateOperationsInput | boolean
    qrCodeContent?: NullableStringFieldUpdateOperationsInput | string | null
    amountDescriptionOverride?: NullableStringFieldUpdateOperationsInput | string | null
    amountLanguage?: StringFieldUpdateOperationsInput | string
    xmlContent?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTVA?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lines?: InvoiceLineUncheckedUpdateManyWithoutInvoiceNestedInput
    allowances?: AllowanceChargeUncheckedUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dispatchDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    signatureDate?: NullableStringFieldUpdateOperationsInput | string | null
    otherDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    operationNature?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    orderReference?: NullableStringFieldUpdateOperationsInput | string | null
    contractReference?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryNoteReference?: NullableStringFieldUpdateOperationsInput | string | null
    supplierId?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    globalDiscount?: FloatFieldUpdateOperationsInput | number
    stampDuty?: FloatFieldUpdateOperationsInput | number
    ttnReference?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMeans?: StringFieldUpdateOperationsInput | string
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankRib?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    checkNumber?: NullableStringFieldUpdateOperationsInput | string | null
    cardType?: NullableStringFieldUpdateOperationsInput | string | null
    cardLast4?: NullableStringFieldUpdateOperationsInput | string | null
    cardReference?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    postalBranchCode?: NullableStringFieldUpdateOperationsInput | string | null
    postalServiceName?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentGateway?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentDescription?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    ircRate?: NullableFloatFieldUpdateOperationsInput | number | null
    ircAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    ircExemptionReason?: NullableStringFieldUpdateOperationsInput | string | null
    qrCodeEnabled?: BoolFieldUpdateOperationsInput | boolean
    qrCodeContent?: NullableStringFieldUpdateOperationsInput | string | null
    amountDescriptionOverride?: NullableStringFieldUpdateOperationsInput | string | null
    amountLanguage?: StringFieldUpdateOperationsInput | string
    xmlContent?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTVA?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RefreshTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InvoiceLineCreateManyInvoiceInput = {
    id?: string
    itemCode: string
    description: string
    quantity: number
    unit: string
    unitPrice: number
    discountRate?: number
    taxRate: number
    fodec?: boolean
    exemptionReason?: string | null
    lineAmount: number
    taxAmount: number
    totalAmount: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AllowanceChargeCreateManyInvoiceInput = {
    id?: string
    type: string
    code: string
    description: string
    amount: number
    basedOn?: string | null
    lineId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceLineUpdateWithoutInvoiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemCode?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    unitPrice?: FloatFieldUpdateOperationsInput | number
    discountRate?: FloatFieldUpdateOperationsInput | number
    taxRate?: FloatFieldUpdateOperationsInput | number
    fodec?: BoolFieldUpdateOperationsInput | boolean
    exemptionReason?: NullableStringFieldUpdateOperationsInput | string | null
    lineAmount?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowances?: AllowanceChargeUpdateManyWithoutLineNestedInput
  }

  export type InvoiceLineUncheckedUpdateWithoutInvoiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemCode?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    unitPrice?: FloatFieldUpdateOperationsInput | number
    discountRate?: FloatFieldUpdateOperationsInput | number
    taxRate?: FloatFieldUpdateOperationsInput | number
    fodec?: BoolFieldUpdateOperationsInput | boolean
    exemptionReason?: NullableStringFieldUpdateOperationsInput | string | null
    lineAmount?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allowances?: AllowanceChargeUncheckedUpdateManyWithoutLineNestedInput
  }

  export type InvoiceLineUncheckedUpdateManyWithoutInvoiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemCode?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    unitPrice?: FloatFieldUpdateOperationsInput | number
    discountRate?: FloatFieldUpdateOperationsInput | number
    taxRate?: FloatFieldUpdateOperationsInput | number
    fodec?: BoolFieldUpdateOperationsInput | boolean
    exemptionReason?: NullableStringFieldUpdateOperationsInput | string | null
    lineAmount?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AllowanceChargeUpdateWithoutInvoiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    basedOn?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    line?: InvoiceLineUpdateOneWithoutAllowancesNestedInput
  }

  export type AllowanceChargeUncheckedUpdateWithoutInvoiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    basedOn?: NullableStringFieldUpdateOperationsInput | string | null
    lineId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AllowanceChargeUncheckedUpdateManyWithoutInvoiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    basedOn?: NullableStringFieldUpdateOperationsInput | string | null
    lineId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceCreateManySupplierInput = {
    id?: string
    documentType: string
    documentNumber: string
    invoiceDate: Date | string
    dueDate?: Date | string | null
    deliveryDate?: Date | string | null
    dispatchDate?: Date | string | null
    paymentDate?: Date | string | null
    signatureDate?: string | null
    otherDate?: Date | string | null
    periodStart?: Date | string | null
    periodEnd?: Date | string | null
    operationNature: string
    currency?: string
    orderReference?: string | null
    contractReference?: string | null
    deliveryNoteReference?: string | null
    userId: string
    buyerId: string
    globalDiscount?: number
    stampDuty?: number
    ttnReference?: string | null
    paymentMeans: string
    bankName?: string | null
    bankCode?: string | null
    bankRib?: string | null
    bankAccountOwner?: string | null
    checkNumber?: string | null
    cardType?: string | null
    cardLast4?: string | null
    cardReference?: string | null
    postalAccountNumber?: string | null
    postalAccountOwner?: string | null
    postalBranchCode?: string | null
    postalServiceName?: string | null
    ePaymentGateway?: string | null
    ePaymentTransactionId?: string | null
    otherPaymentDescription?: string | null
    otherPaymentReference?: string | null
    ircRate?: number | null
    ircAmount?: number | null
    ircExemptionReason?: string | null
    qrCodeEnabled?: boolean
    qrCodeContent?: string | null
    amountDescriptionOverride?: string | null
    amountLanguage?: string
    xmlContent: string
    status?: string
    totalHT?: number
    totalTVA?: number
    totalTTC?: number
    deletedAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceCreateManyBuyerInput = {
    id?: string
    documentType: string
    documentNumber: string
    invoiceDate: Date | string
    dueDate?: Date | string | null
    deliveryDate?: Date | string | null
    dispatchDate?: Date | string | null
    paymentDate?: Date | string | null
    signatureDate?: string | null
    otherDate?: Date | string | null
    periodStart?: Date | string | null
    periodEnd?: Date | string | null
    operationNature: string
    currency?: string
    orderReference?: string | null
    contractReference?: string | null
    deliveryNoteReference?: string | null
    userId: string
    supplierId: string
    globalDiscount?: number
    stampDuty?: number
    ttnReference?: string | null
    paymentMeans: string
    bankName?: string | null
    bankCode?: string | null
    bankRib?: string | null
    bankAccountOwner?: string | null
    checkNumber?: string | null
    cardType?: string | null
    cardLast4?: string | null
    cardReference?: string | null
    postalAccountNumber?: string | null
    postalAccountOwner?: string | null
    postalBranchCode?: string | null
    postalServiceName?: string | null
    ePaymentGateway?: string | null
    ePaymentTransactionId?: string | null
    otherPaymentDescription?: string | null
    otherPaymentReference?: string | null
    ircRate?: number | null
    ircAmount?: number | null
    ircExemptionReason?: string | null
    qrCodeEnabled?: boolean
    qrCodeContent?: string | null
    amountDescriptionOverride?: string | null
    amountLanguage?: string
    xmlContent: string
    status?: string
    totalHT?: number
    totalTVA?: number
    totalTTC?: number
    deletedAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceUpdateWithoutSupplierInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dispatchDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    signatureDate?: NullableStringFieldUpdateOperationsInput | string | null
    otherDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    operationNature?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    orderReference?: NullableStringFieldUpdateOperationsInput | string | null
    contractReference?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryNoteReference?: NullableStringFieldUpdateOperationsInput | string | null
    globalDiscount?: FloatFieldUpdateOperationsInput | number
    stampDuty?: FloatFieldUpdateOperationsInput | number
    ttnReference?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMeans?: StringFieldUpdateOperationsInput | string
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankRib?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    checkNumber?: NullableStringFieldUpdateOperationsInput | string | null
    cardType?: NullableStringFieldUpdateOperationsInput | string | null
    cardLast4?: NullableStringFieldUpdateOperationsInput | string | null
    cardReference?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    postalBranchCode?: NullableStringFieldUpdateOperationsInput | string | null
    postalServiceName?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentGateway?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentDescription?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    ircRate?: NullableFloatFieldUpdateOperationsInput | number | null
    ircAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    ircExemptionReason?: NullableStringFieldUpdateOperationsInput | string | null
    qrCodeEnabled?: BoolFieldUpdateOperationsInput | boolean
    qrCodeContent?: NullableStringFieldUpdateOperationsInput | string | null
    amountDescriptionOverride?: NullableStringFieldUpdateOperationsInput | string | null
    amountLanguage?: StringFieldUpdateOperationsInput | string
    xmlContent?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTVA?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInvoicesNestedInput
    buyer?: PartnerUpdateOneRequiredWithoutBuyerInvoicesNestedInput
    lines?: InvoiceLineUpdateManyWithoutInvoiceNestedInput
    allowances?: AllowanceChargeUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateWithoutSupplierInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dispatchDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    signatureDate?: NullableStringFieldUpdateOperationsInput | string | null
    otherDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    operationNature?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    orderReference?: NullableStringFieldUpdateOperationsInput | string | null
    contractReference?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryNoteReference?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    globalDiscount?: FloatFieldUpdateOperationsInput | number
    stampDuty?: FloatFieldUpdateOperationsInput | number
    ttnReference?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMeans?: StringFieldUpdateOperationsInput | string
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankRib?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    checkNumber?: NullableStringFieldUpdateOperationsInput | string | null
    cardType?: NullableStringFieldUpdateOperationsInput | string | null
    cardLast4?: NullableStringFieldUpdateOperationsInput | string | null
    cardReference?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    postalBranchCode?: NullableStringFieldUpdateOperationsInput | string | null
    postalServiceName?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentGateway?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentDescription?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    ircRate?: NullableFloatFieldUpdateOperationsInput | number | null
    ircAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    ircExemptionReason?: NullableStringFieldUpdateOperationsInput | string | null
    qrCodeEnabled?: BoolFieldUpdateOperationsInput | boolean
    qrCodeContent?: NullableStringFieldUpdateOperationsInput | string | null
    amountDescriptionOverride?: NullableStringFieldUpdateOperationsInput | string | null
    amountLanguage?: StringFieldUpdateOperationsInput | string
    xmlContent?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTVA?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lines?: InvoiceLineUncheckedUpdateManyWithoutInvoiceNestedInput
    allowances?: AllowanceChargeUncheckedUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateManyWithoutSupplierInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dispatchDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    signatureDate?: NullableStringFieldUpdateOperationsInput | string | null
    otherDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    operationNature?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    orderReference?: NullableStringFieldUpdateOperationsInput | string | null
    contractReference?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryNoteReference?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    globalDiscount?: FloatFieldUpdateOperationsInput | number
    stampDuty?: FloatFieldUpdateOperationsInput | number
    ttnReference?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMeans?: StringFieldUpdateOperationsInput | string
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankRib?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    checkNumber?: NullableStringFieldUpdateOperationsInput | string | null
    cardType?: NullableStringFieldUpdateOperationsInput | string | null
    cardLast4?: NullableStringFieldUpdateOperationsInput | string | null
    cardReference?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    postalBranchCode?: NullableStringFieldUpdateOperationsInput | string | null
    postalServiceName?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentGateway?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentDescription?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    ircRate?: NullableFloatFieldUpdateOperationsInput | number | null
    ircAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    ircExemptionReason?: NullableStringFieldUpdateOperationsInput | string | null
    qrCodeEnabled?: BoolFieldUpdateOperationsInput | boolean
    qrCodeContent?: NullableStringFieldUpdateOperationsInput | string | null
    amountDescriptionOverride?: NullableStringFieldUpdateOperationsInput | string | null
    amountLanguage?: StringFieldUpdateOperationsInput | string
    xmlContent?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTVA?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceUpdateWithoutBuyerInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dispatchDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    signatureDate?: NullableStringFieldUpdateOperationsInput | string | null
    otherDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    operationNature?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    orderReference?: NullableStringFieldUpdateOperationsInput | string | null
    contractReference?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryNoteReference?: NullableStringFieldUpdateOperationsInput | string | null
    globalDiscount?: FloatFieldUpdateOperationsInput | number
    stampDuty?: FloatFieldUpdateOperationsInput | number
    ttnReference?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMeans?: StringFieldUpdateOperationsInput | string
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankRib?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    checkNumber?: NullableStringFieldUpdateOperationsInput | string | null
    cardType?: NullableStringFieldUpdateOperationsInput | string | null
    cardLast4?: NullableStringFieldUpdateOperationsInput | string | null
    cardReference?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    postalBranchCode?: NullableStringFieldUpdateOperationsInput | string | null
    postalServiceName?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentGateway?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentDescription?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    ircRate?: NullableFloatFieldUpdateOperationsInput | number | null
    ircAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    ircExemptionReason?: NullableStringFieldUpdateOperationsInput | string | null
    qrCodeEnabled?: BoolFieldUpdateOperationsInput | boolean
    qrCodeContent?: NullableStringFieldUpdateOperationsInput | string | null
    amountDescriptionOverride?: NullableStringFieldUpdateOperationsInput | string | null
    amountLanguage?: StringFieldUpdateOperationsInput | string
    xmlContent?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTVA?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInvoicesNestedInput
    supplier?: PartnerUpdateOneRequiredWithoutSupplierInvoicesNestedInput
    lines?: InvoiceLineUpdateManyWithoutInvoiceNestedInput
    allowances?: AllowanceChargeUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateWithoutBuyerInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dispatchDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    signatureDate?: NullableStringFieldUpdateOperationsInput | string | null
    otherDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    operationNature?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    orderReference?: NullableStringFieldUpdateOperationsInput | string | null
    contractReference?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryNoteReference?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    supplierId?: StringFieldUpdateOperationsInput | string
    globalDiscount?: FloatFieldUpdateOperationsInput | number
    stampDuty?: FloatFieldUpdateOperationsInput | number
    ttnReference?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMeans?: StringFieldUpdateOperationsInput | string
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankRib?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    checkNumber?: NullableStringFieldUpdateOperationsInput | string | null
    cardType?: NullableStringFieldUpdateOperationsInput | string | null
    cardLast4?: NullableStringFieldUpdateOperationsInput | string | null
    cardReference?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    postalBranchCode?: NullableStringFieldUpdateOperationsInput | string | null
    postalServiceName?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentGateway?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentDescription?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    ircRate?: NullableFloatFieldUpdateOperationsInput | number | null
    ircAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    ircExemptionReason?: NullableStringFieldUpdateOperationsInput | string | null
    qrCodeEnabled?: BoolFieldUpdateOperationsInput | boolean
    qrCodeContent?: NullableStringFieldUpdateOperationsInput | string | null
    amountDescriptionOverride?: NullableStringFieldUpdateOperationsInput | string | null
    amountLanguage?: StringFieldUpdateOperationsInput | string
    xmlContent?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTVA?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lines?: InvoiceLineUncheckedUpdateManyWithoutInvoiceNestedInput
    allowances?: AllowanceChargeUncheckedUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateManyWithoutBuyerInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dispatchDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    signatureDate?: NullableStringFieldUpdateOperationsInput | string | null
    otherDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    operationNature?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    orderReference?: NullableStringFieldUpdateOperationsInput | string | null
    contractReference?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryNoteReference?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    supplierId?: StringFieldUpdateOperationsInput | string
    globalDiscount?: FloatFieldUpdateOperationsInput | number
    stampDuty?: FloatFieldUpdateOperationsInput | number
    ttnReference?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMeans?: StringFieldUpdateOperationsInput | string
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    bankCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankRib?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    checkNumber?: NullableStringFieldUpdateOperationsInput | string | null
    cardType?: NullableStringFieldUpdateOperationsInput | string | null
    cardLast4?: NullableStringFieldUpdateOperationsInput | string | null
    cardReference?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    postalAccountOwner?: NullableStringFieldUpdateOperationsInput | string | null
    postalBranchCode?: NullableStringFieldUpdateOperationsInput | string | null
    postalServiceName?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentGateway?: NullableStringFieldUpdateOperationsInput | string | null
    ePaymentTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentDescription?: NullableStringFieldUpdateOperationsInput | string | null
    otherPaymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    ircRate?: NullableFloatFieldUpdateOperationsInput | number | null
    ircAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    ircExemptionReason?: NullableStringFieldUpdateOperationsInput | string | null
    qrCodeEnabled?: BoolFieldUpdateOperationsInput | boolean
    qrCodeContent?: NullableStringFieldUpdateOperationsInput | string | null
    amountDescriptionOverride?: NullableStringFieldUpdateOperationsInput | string | null
    amountLanguage?: StringFieldUpdateOperationsInput | string
    xmlContent?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalHT?: FloatFieldUpdateOperationsInput | number
    totalTVA?: FloatFieldUpdateOperationsInput | number
    totalTTC?: FloatFieldUpdateOperationsInput | number
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AllowanceChargeCreateManyLineInput = {
    id?: string
    type: string
    code: string
    description: string
    amount: number
    basedOn?: string | null
    invoiceId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AllowanceChargeUpdateWithoutLineInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    basedOn?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoice?: InvoiceUpdateOneWithoutAllowancesNestedInput
  }

  export type AllowanceChargeUncheckedUpdateWithoutLineInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    basedOn?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AllowanceChargeUncheckedUpdateManyWithoutLineInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    basedOn?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InvoiceCountOutputTypeDefaultArgs instead
     */
    export type InvoiceCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InvoiceCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PartnerCountOutputTypeDefaultArgs instead
     */
    export type PartnerCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PartnerCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InvoiceLineCountOutputTypeDefaultArgs instead
     */
    export type InvoiceLineCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InvoiceLineCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserSignatureDefaultArgs instead
     */
    export type UserSignatureArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserSignatureDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SignatureAuditDefaultArgs instead
     */
    export type SignatureAuditArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SignatureAuditDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RefreshTokenDefaultArgs instead
     */
    export type RefreshTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RefreshTokenDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InvoiceDefaultArgs instead
     */
    export type InvoiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InvoiceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PartnerDefaultArgs instead
     */
    export type PartnerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PartnerDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InvoiceLineDefaultArgs instead
     */
    export type InvoiceLineArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InvoiceLineDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AllowanceChargeDefaultArgs instead
     */
    export type AllowanceChargeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AllowanceChargeDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}