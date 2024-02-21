import _ from "lodash-es";

export const useRouteQuery = <T extends object>(defaults: T) => {
  const router = useRouter();
  const route = useRoute();
  const q = route.query;

  const query = reactive<T>(
    _.mapValues(defaults, (v, k): any => {
      // 这里保证类型一致
      if (!(k in q)) return v;
      if (typeof v === "number") return Number(q[k]);
      if (typeof v === "boolean") return q[k] === "true";
      return q[k] as string;
    })
  );

  watch(query, () =>
    router.replace({ path: route.path, query: _.pickBy(query, (v, k) => v != (defaults as any)[k]) as any })
  );

  return query;
};
