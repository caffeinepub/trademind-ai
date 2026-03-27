import { useMutation, useQuery } from "@tanstack/react-query";
import { UserRole } from "../backend.d";
import { useActor } from "./useActor";

export function useUserRole() {
  const { actor, isFetching } = useActor();
  return useQuery<UserRole>({
    queryKey: ["userRole"],
    queryFn: async () => {
      if (!actor) return UserRole.guest;
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsStripeConfigured() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["stripeConfigured"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isStripeConfigured();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateCheckoutSession() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const successUrl = `${window.location.origin}/upgrade-success`;
      const cancelUrl = `${window.location.origin}/`;
      const url = await actor.createCheckoutSession(
        [
          {
            productName: "TradeMind AI Premium",
            currency: "inr",
            quantity: BigInt(1),
            priceInCents: BigInt(99900),
            productDescription:
              "Unlimited AI stock analysis, chart uploads, and premium insights",
          },
        ],
        successUrl,
        cancelUrl,
      );
      return url;
    },
  });
}
