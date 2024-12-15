import { FirebaseDateType } from "@/types";


export const getFirebaseDate = (time: FirebaseDateType) => new Date(time.seconds * 1000 + time.nanoseconds / 1000000);