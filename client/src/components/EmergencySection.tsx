import { Phone, Hospital, Shield, Siren } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { emergencyContacts } from "@/lib/mockData";

const iconMap: Record<string, typeof Hospital> = {
  Hospital,
  Shield,
  Siren,
};

export function EmergencySection() {
  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-background dark:from-red-950/20 dark:to-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
            <Phone className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Emergency Contacts</h1>
          <p className="text-muted-foreground">
            Quick access to essential emergency services near campus
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-1">
          {emergencyContacts.map((contact) => {
            const Icon = iconMap[contact.icon] || Phone;
            return (
              <Card key={contact.id} className="hover-elevate" data-testid={`card-emergency-${contact.id}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-7 w-7 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-semibold text-lg">{contact.name}</h2>
                      <p className="text-sm text-muted-foreground">{contact.description}</p>
                    </div>
                    <Button
                      size="lg"
                      className="gap-2 bg-red-600 hover:bg-red-700 text-white flex-shrink-0"
                      onClick={() => handleCall(contact.phone)}
                      data-testid={`button-call-${contact.id}`}
                    >
                      <Phone className="h-5 w-5" />
                      <span className="hidden sm:inline">Tap to Call</span>
                      <span className="font-mono">{contact.phone}</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mt-8 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              In case of a life-threatening emergency, always call <strong>119</strong> (Police) or <strong>110</strong> (Ambulance) first.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
