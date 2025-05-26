import { Badge } from "@ui/components/ui/badge";
import { Button } from "@ui/components/ui/button";
import { Card, CardContent, CardFooter } from "@ui/components/ui/card";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";

export interface SessionCardProps {
  id: number;
  expiresAt: Date;
  createdAt: Date;
  userAgent: string | null;
  currentSession?: boolean;
}

export default function SessionCard(props: SessionCardProps) {
  const { id, createdAt, expiresAt, userAgent, currentSession } = props;
  return (
    <div>
      <Card key={id} className="overflow-hidden max-w-[600px]">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">Session {id}</h3>
              {currentSession && (
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  Current
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Created</span>
              <span>{format(new Date(createdAt), "PPP p")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Expires</span>
              <span>{format(new Date(expiresAt), "PPP p")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Browser</span>
              <span className="truncate max-w-[200px]">{userAgent}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-muted/50 p-4">
          {!currentSession && (
            <Button
              variant="destructive"
              size="sm"
              className="ml-auto"
              //   onClick={() => handleDelete(id)}
              //   disabled={isDeleting === id}
            >
              {/* {isDeleting === id ? (
                "Deleting..."
              ) : ( */}
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Session
              </>
              {/* )} */}
            </Button>
          )}
          {currentSession && (
            <span className="ml-auto text-sm text-muted-foreground">
              Current session cannot be deleted
            </span>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
