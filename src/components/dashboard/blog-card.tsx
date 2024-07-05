import { Blog } from "@/utils/interfaces";

export default function BlogCard({blog}:{blog:Blog}){
    return(
        <div className=" grid grid-cols-1 w-full gap-2 sm:w-min min-w-[300px] max-w-[400px] lg:max-w-[500px] bg-dimwhite/60 text-black p md:p-1 lg:p-2">
            <div className=" font-medium">{blog.title}</div>
            <p className=" h-12 overflow-hidden">{blog.introduction}</p>
            <p className=" self-end">Points : {blog.points.length}</p>
            <p className=" self-end">{new Date(blog.created_at).toDateString()}</p>
        </div>
    )
}