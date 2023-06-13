export type TemplateResponseType = {
  _url: string;
  name: string;
  icon: string;
  text: string;
  category: string;
};

export type TemplateArrayResponseType = Array<TemplateResponseType>;

export type PlanResponseType = {
  id: string | number;
  name: string;
  price: string | number;
  image: string | number | null;
  words: string | number | null;
  slug: string | null;
  billing_cycle: string | null;
  created_at: string | null;
  custom_order: string | null;
  description: string | null;
  frequency_unit: string | number | null;
  is_default: string | number | null;
  is_popular: string | number | null;
  items: string | null;
  options: string | null;
  status: string | boolean | null;
  uid: string | null;
  updated_at: string | null;
  user_id: null;
};

export type PlansResponseType = Array<PlanResponseType>;

export type PostResponseType = {
  id: number | string;
  date: string | null;
  slug: string | null;
  status: string | null;
  link: string | null;
  title: string | null;
  image: string | false | null;
  author: string | false | null;
  content: string | null;
};

export type PostsResponseType = Array<PostResponseType>;

export type UserResponseType = {
  user__id: string | number;
  nickname: string;
  username: string;
  usermail: string;
  user_img: string | null | false;
  user_jwt: string | null;
};

export type SubscriptionResponseType = {
  id: number | string;
  uid: string | null;
  user_id: string | number | null;
  plan_id: string | number | null;
  payment_method: string | number | number;
  words: string | number;
  image: string | number;
  options: string | null;
  status: "new" | "pending" | "active" | "ended" | "renew";
  paid: string | number;
  payment_claimed: string | number;
  current_period_ends_at: string | null;
  start_at: string | number;
  end_at: string | number;
  end_period_last_days: string | number;
  plan?: PlanResponseType;
  created_at: string;
  updated_at: string;
};

export type DashboardResponseType = {
  images_all: number | string;
  words_used: number | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  charts_data: Array<any>;
  active_plan: PlanResponseType | null;
  subscription: SubscriptionResponseType | null;
  created_docs: number | string;
  template_used: number | string;
};

export type SupportResponseType = {
  comment_ID: string | number;
  comment_post_ID: string | number;
  comment_author: string;
  comment_author_email: string;
  comment_author_url: string | null;
  comment_author_IP: string | null;
  comment_date: string;
  comment_date_gmt: string;
  comment_content: string;
  comment_karma: string | null;
  comment_approved: "1" | "0" | "spam" | "trash";
  comment_agent: string;
  comment_parent: string | number;
  user_id: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any[];
};

export type SuppoertsResponseType = Array<SupportResponseType | null>;

export type DocumentResponseType = {
  id: number | string;
  uid: string | number | null;
  user_id: string | number;
  blog_name: string | null;
  blog_title: string | null;
  docs_name: string | null;
  word_used: string | number | null;
  description: string | null;
  text: string | null;
  html: string | null;
  options: string | null;
  status: string | "1" | "0";
  language: string | null;
  created_at: string;
  updated_at: string;
};

export type DocumenteArrayResponseType = Array<DocumentResponseType> | null;

export type ImageResponseType = {
  id: string | number;
  uid: string | null;
  user_id: string | number;
  subscription_id: string | number;
  url: string | null;
  path: string | null;
  name: string | null;
  size: string | null;
  type: string | null;
  title: string | null;
  discription: string | null;
  options: string | null;
  data: string | null;
  created_at: string;
  updated_at: string;
};

export type ImageArrayResponseType = Array<ImageResponseType>;

export type PurchaseLogResponse = {
  id: string | number;
  uid: string | number | null;
  user_id: string | number;
  words: string | number;
  image: string | number;
  price: string | number;
  plan_id: string | number;
  plan_name: string;
  subscription_id: string;
  options: string | null;
  payment_method: string | null;
  status: "new" | "pending" | "active" | "ended" | "renew";
  created_at: string;
  updated_at: string;
};

export type PurchaseLogArrayResponse = Array<PurchaseLogResponse>;
