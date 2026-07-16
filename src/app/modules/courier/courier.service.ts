import * as SteadfastProvider from "../../providers/steadfast.provider.js";

const createSteadfastParcel = async (
  orderId: string
) => {
  const response =
    await SteadfastProvider.createParcel(
      orderId
    );

  return response;
};

const trackSteadfastParcel = async (
  consignmentId: string
) => {
  return SteadfastProvider.trackParcel(
    consignmentId
  );
};

export const courierService = {
  createSteadfastParcel,
  trackSteadfastParcel,
};