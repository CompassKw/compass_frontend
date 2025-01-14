declare interface Api {
  status: boolean;
  message: string;
  data: {
    partiners: Partner[];
    companies: Company[];
    trips: Trip[];
    trip: Trip;
    brandAmbassadors: Ambassador[];
    brandAmbassador: Ambassador;
    tourOperator:Ambassador[];
    posts: Post[];
    post: Post;
    stores: Product[];
    store: SingleProduct;
    carts: CartProduct[];
    about: AboutPage;
    user: User;
    token: string;
    message: string;
    records: number;
  };
  about: About;
}
