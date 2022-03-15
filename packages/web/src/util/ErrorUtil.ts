export function NPECheck(
   object: any,
   nestedProps: any,
   substitute: string | null = "Not specified"
) {
   if (!object) return null;
   const nested = nestedProps.split("/");
   let val = object;

   while (nested.length > 0) {
      const prop = nested.shift();
      if (!val[prop] && val[prop] !== 0) {
         return substitute;
      }
      val = val[prop];
   }

   if (!val && val !== 0) {
      return substitute;
   }
   return val;
}

export function getErrorMessage(error: any) {
   if (!error) return null;
   let errorMsg = NPECheck(error, "graphQLErrors/0/message", null);
   if (errorMsg) return errorMsg;

   errorMsg = NPECheck(error, "networkError/result/errors/0/message", null);
   if (errorMsg) return errorMsg;
}

export function getJoiErrors(error: any) {
   if (!error) return null;
   const errorMsg = NPECheck(
      error,
      "graphQLErrors/0/extensions/exception/invalidArgs",
      null
   );
   if (errorMsg) return errorMsg;
}
