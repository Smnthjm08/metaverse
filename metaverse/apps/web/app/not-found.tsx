import { Button } from "@ui/components/ui/button";

interface NotFoundProps {
  title?: string;
  description?: string;
}

export default function NotFound({
  title = "Page not found",
  description = "Lost, this page is not found in this app.",
}: NotFoundProps) {
  return (
    <div className="relative text-center z-[1] pt-52">
      <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-primary sm:text-7xl">
        {title}
      </h1>
      <p className="mt-6 text-pretty text-lg font-medium text-muted-foreground sm:text-xl/8">
        {description}
      </p>
      <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-y-3 gap-x-6">
        <Button className="-order-1 sm:order-none" asChild>
          <a href="/app">Take me home</a>
        </Button>
      </div>
    </div>
  );
}
