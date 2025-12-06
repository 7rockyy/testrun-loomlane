const hasUrl = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL)
const hasAnonKey = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export const hasSupabaseConfig = hasUrl && hasAnonKey

const now = new Date()
const toIso = (date: Date) => date.toISOString()
const addDays = (days: number) => {
  const copy = new Date(now)
  copy.setDate(copy.getDate() + days)
  return toIso(copy)
}

const mockUniversities = [
  {
    id: "uni_demo",
    name: "Loomlane University",
    email_domain: "loomlane.edu",
    logo_url: null,
    created_at: toIso(new Date(now.getFullYear(), 0, 1)),
  },
]

const mockDrops = [
  {
    id: "drop_active",
    university_id: "uni_demo",
    title: "BITS Hyderabad Launch Drop",
    description: "First wave of BITS Hyderabad tees, hoodies and jackets.",
    start_date: addDays(-1),
    end_date: addDays(6),
    is_active: true,
    created_at: toIso(now),
  },
  {
    id: "drop_upcoming",
    university_id: "uni_demo",
    title: "Finals Week Comfort Pack",
    description: "Ultra-soft loungewear coming soon.",
    start_date: addDays(7),
    end_date: addDays(14),
    is_active: true,
    created_at: toIso(now),
  },
]

const mockProducts = [
  {
    id: "prod_hoodie_1",
    university_id: "uni_demo",
    name: "BITS Hyderabad Crest Tee",
    description: "Navy tee with bold BITS Hyderabad varsity lettering.",
    category: "Hoodies",
    price: 2499,
    image_url: "/images/products/bits-hyd-tee-navy.png",
    images: [],
    sizes: ["S", "M", "L", "XL"],
    stock: { S: 8, M: 12, L: 10, XL: 6 },
    is_active: true,
    is_limited_edition: true,
    drop_id: "drop_active",
    created_at: toIso(now),
    updated_at: toIso(now),
  },
  {
    id: "prod_tee_1",
    university_id: "uni_demo",
    name: "Bits Pilani Script Sweatshirt",
    description: "White v-neck sweatshirt with green Bits Pilani script.",
    category: "Tees",
    price: 1299,
    image_url: "/images/products/bits-pilani-script-sweatshirt.png",
    images: [],
    sizes: ["S", "M", "L", "XL"],
    stock: { S: 15, M: 18, L: 14, XL: 9 },
    is_active: true,
    is_limited_edition: false,
    drop_id: null,
    created_at: toIso(now),
    updated_at: toIso(now),
  },
  {
    id: "prod_tee_2",
    university_id: "uni_demo",
    name: "BITS Zip Hoodie EST. 1964",
    description: "Full-zip hoodie with bold BITS wordmark and founding year.",
    category: "Tees",
    price: 1399,
    image_url: "/images/products/bits-hoodie-est1964.png",
    images: [],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: { XS: 5, S: 8, M: 10, L: 7, XL: 4 },
    is_active: true,
    is_limited_edition: true,
    drop_id: "drop_active",
    created_at: toIso(now),
    updated_at: toIso(now),
  },
  {
    id: "prod_cap_1",
    university_id: "uni_demo",
    name: "BITS Pilani Quarter Zip",
    description: "Deep red quarter-zip with white BITS Pilani chest print.",
    category: "Accessories",
    price: 999,
    image_url: "/images/products/bits-quarter-zip-red.png",
    images: [],
    sizes: ["One Size"],
    stock: { "One Size": 20 },
    is_active: true,
    is_limited_edition: false,
    drop_id: null,
    created_at: toIso(now),
    updated_at: toIso(now),
  },
  {
    id: "prod_sweat_1",
    university_id: "uni_demo",
    name: "BPHC Graphic Tee",
    description: "Washed black tee with Bits Pilani graphic and BPHC logo.",
    category: "Sweatshirts",
    price: 1899,
    image_url: "/images/products/bphc-graphic-tee.png",
    images: [],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: { S: 7, M: 11, L: 9, XL: 5, XXL: 3 },
    is_active: true,
    is_limited_edition: false,
    drop_id: null,
    created_at: toIso(now),
    updated_at: toIso(now),
  },
  {
    id: "prod_track_1",
    university_id: "uni_demo",
    name: "BITS Track Jacket",
    description: "White track jacket with BITS crest and multicolor stripes.",
    category: "Outerwear",
    price: 2799,
    image_url: "/images/products/bits-track-jacket.png",
    images: [],
    sizes: ["S", "M", "L", "XL"],
    stock: { S: 4, M: 6, L: 5, XL: 3 },
    is_active: true,
    is_limited_edition: true,
    drop_id: "drop_upcoming",
    created_at: toIso(now),
    updated_at: toIso(now),
  },
]

const tableData: Record<string, any[]> = {
  products: mockProducts,
  drops: mockDrops,
  universities: mockUniversities,
  users: [
    {
      id: "user_mock",
      email: "demo@loomlane.edu",
      full_name: "Demo Student",
      phone: "+1 (555) 123-4567",
      university_id: "uni_demo",
      role: "student",
      created_at: toIso(now),
      updated_at: toIso(now),
    },
  ],
  cart_items: [],
  orders: [],
  order_items: [],
  pages: [
    {
      id: "page_about",
      slug: "about",
      title: "About Loomlane",
      meta_description: "How Loomlane brings campus merchandise to students.",
      is_published: true,
      content: `
        <h1>Our Story</h1>
        <p>Loomlane was started by students who were tired of bland campus gear and supply-chain headaches. We partner directly with universities and local makers to deliver premium, student-approved merch.</p>
        <h2>What We Believe</h2>
        <ul>
          <li><strong>Quality first:</strong> Heavyweight fabrics, better fits, longer life.</li>
          <li><strong>Student-led:</strong> Designs come from real campus voices, not generic catalogs.</li>
          <li><strong>Limited drops:</strong> Small-batch releases keep things special and reduce waste.</li>
        </ul>
        <h2>How It Works</h2>
        <ol>
          <li>We co-design with student creators and university teams.</li>
          <li>We produce in small runs with verified suppliers.</li>
          <li>You shop online; we ship fast with transparent tracking.</li>
        </ol>
        <h2>What&apos;s Next</h2>
        <p>We&apos;re expanding to more campuses, introducing sustainable fabrics, and enabling student clubs to launch their own capsule collections.</p>
        <p>Have an idea? Reach us at <a href="mailto:hello@loomlane.com">hello@loomlane.com</a>.</p>
      `,
      created_at: toIso(now),
      updated_at: toIso(now),
    },
    {
      id: "page_contact",
      slug: "contact",
      title: "Contact Loomlane",
      meta_description: "How to reach Loomlane for support, partnerships, and campus collabs.",
      is_published: true,
      content: `
        <h1>Contact Us</h1>
        <p>We respond fast on business days. For urgent order issues, include your order number in the subject line.</p>
        <h2>Best Practices</h2>
        <ul>
          <li><strong>Support:</strong> <a href="mailto:support@loomlane.com">support@loomlane.com</a> — order status, returns, sizing.</li>
          <li><strong>Partnerships:</strong> <a href="mailto:partners@loomlane.com">partners@loomlane.com</a> — campus collabs, licensing, bulk orders.</li>
          <li><strong>Creators:</strong> <a href="mailto:create@loomlane.com">create@loomlane.com</a> — student designers and clubs.</li>
          <li><strong>Response time:</strong> 1–2 business days; include screenshots and links to speed things up.</li>
        </ul>
        <h2>Returns &amp; Exchanges</h2>
        <p>Unworn items within 30 days. Keep tags on and include your order number for the RMA.</p>
        <h2>Shipping</h2>
        <p>Tracking is emailed at fulfillment. If you see no movement for 72 hours, reach out so we can chase the courier.</p>
      `,
      created_at: toIso(now),
      updated_at: toIso(now),
    },
    {
      id: "page_our_work",
      slug: "our-work",
      title: "Our Work",
      meta_description: "Campus collabs, limited drops, and how we build student-loved merch.",
      is_published: true,
      content: `
        <h1>Our Work</h1>
        <p>Every drop is built with students, not just for them. Here&apos;s how we do it.</p>
        <h2>Best Practices</h2>
        <ul>
          <li><strong>Co-create with campus:</strong> We workshop with student clubs and faculty to keep designs authentic.</li>
          <li><strong>Small-batch drops:</strong> Limited runs reduce waste and keep collections special.</li>
          <li><strong>Material standards:</strong> Heavyweight fleece, ringspun cotton, and verified dyes only.</li>
          <li><strong>Fit-tested:</strong> Samples are tried on by real students across sizes before production.</li>
          <li><strong>Transparent supply:</strong> We publish timelines and update tracking quickly when things slip.</li>
        </ul>
        <h2>Recent Highlights</h2>
        <ul>
          <li>GreenWave Retro Drop — sold out in 48 hours; 92% satisfaction rating.</li>
          <li>Design Dept. Collab — student-illustrated graphics with water-based inks.</li>
          <li>Track Club Windbreaker — reflective hits and recycled nylon panels.</li>
        </ul>
        <h2>Want to build with us?</h2>
        <p>Email <a href="mailto:create@loomlane.com">create@loomlane.com</a> with your club deck and timelines.</p>
      `,
      created_at: toIso(now),
      updated_at: toIso(now),
    },
  ],
}

function createMockQueryBuilder(tableName: string) {
  let data = [...(tableData[tableName] || [])]
  let head = false
  let countRequested = false

  const response = () => ({
    data: head ? [] : data,
    count: countRequested ? data.length : null,
    error: null,
  })

  const chain: any = {
    select: (_columns?: string, options?: any) => {
      head = Boolean(options?.head)
      countRequested = Boolean(options?.count)
      return chain
    },
    insert: async (payload: any) => ({ data: payload ?? null, error: null }),
    update: async (payload: any) => ({ data: payload ?? null, error: null }),
    delete: async () => ({ data: null, error: null }),
    eq: (field: string, value: any) => {
      if (value !== undefined) {
        data = data.filter((item: any) => item?.[field] === value)
      }
      return chain
    },
    order: (field: string, options?: { ascending?: boolean }) => {
      const direction = options?.ascending === false ? -1 : 1
      data = [...data].sort((a, b) => {
        const aVal = a?.[field]
        const bVal = b?.[field]
        return aVal > bVal ? direction : aVal < bVal ? -direction : 0
      })
      return chain
    },
    lte: (field: string, value: any) => {
      const comparison = new Date(value).getTime()
      data = data.filter((item: any) => new Date(item?.[field]).getTime() <= comparison)
      return chain
    },
    gte: (field: string, value: any) => {
      const comparison = new Date(value).getTime()
      data = data.filter((item: any) => new Date(item?.[field]).getTime() >= comparison)
      return chain
    },
    limit: (limit: number) => {
      data = data.slice(0, limit)
      return chain
    },
    single: async () => ({ data: data[0] ?? null, error: null }),
    maybeSingle: async () => ({ data: data[0] ?? null, error: null }),
    then: (resolve: any, reject: any) => Promise.resolve(response()).then(resolve, reject),
  }

  return chain
}

export function createMockSupabaseClient() {
  return {
    auth: {
      getUser: async () => ({ data: { user: { id: "user_mock" } }, error: null }),
      signOut: async () => ({ error: null }),
      signUp: async () => ({ data: null, error: new Error("Supabase not configured") }),
      signInWithPassword: async () => ({ data: null, error: new Error("Supabase not configured") }),
      signInWithOAuth: async () => ({ data: null, error: new Error("Supabase not configured") }),
    },
    from: (table: string) => createMockQueryBuilder(table),
  } as any
}
