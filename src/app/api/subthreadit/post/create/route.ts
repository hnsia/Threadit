import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PostValidator } from "@/lib/validators/post";
import { SubthreaditSubscriptionValidator } from "@/lib/validators/subthreadit";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { subthreaditId, title, content } = PostValidator.parse(body);

    const subscriptionExists = await db.subscription.findFirst({
      where: {
        subthreaditId,
        userId: session.user.id,
      },
    });

    if (!subscriptionExists) {
      return new Response("You must subscribe to this subthreadit first.", {
        status: 400,
      });
    }

    await db.post.create({
      data: {
        title,
        content,
        authorId: session.user.id,
        subthreaditId,
      },
    });

    return new Response(subthreaditId);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed.", { status: 422 });
    }

    return new Response(
      "Could not post to subthreadit at this time, please try again later.",
      { status: 500 }
    );
  }
}
