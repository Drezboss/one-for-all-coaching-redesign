import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Shield, FileText, Download, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface GdprConsentProps {
  userId: number;
  currentConsents?: {
    gdprConsent: boolean;
    dataProcessingConsent: boolean;
    marketingConsent: boolean;
    gdprConsentDate?: string;
  };
  onConsentUpdate?: () => void;
}

export function GdprConsent({ userId, currentConsents, onConsentUpdate }: GdprConsentProps) {
  const [consents, setConsents] = useState({
    gdprConsent: currentConsents?.gdprConsent || false,
    dataProcessingConsent: currentConsents?.dataProcessingConsent || false,
    marketingConsent: currentConsents?.marketingConsent || false,
  });
  const { toast } = useToast();

  const updateConsentsMutation = useMutation({
    mutationFn: (data: typeof consents) =>
      apiRequest("POST", "/api/gdpr/update-consents", { userId, ...data }),
    onSuccess: () => {
      toast({
        title: "Consent Updated",
        description: "Your privacy preferences have been saved.",
      });
      onConsentUpdate?.();
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Could not update consent preferences.",
        variant: "destructive",
      });
    },
  });

  const exportDataMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/gdpr/export-data", { userId }),
    onSuccess: (data: any) => {
      // Create and download JSON file
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `personal-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Data Export Complete",
        description: "Your personal data has been downloaded.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Export Failed",
        description: error.message || "Could not export your data.",
        variant: "destructive",
      });
    },
  });

  const deleteDataMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/gdpr/request-deletion", { userId }),
    onSuccess: () => {
      toast({
        title: "Deletion Request Submitted",
        description: "Your account will be deleted within 30 days as required by GDPR.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Request Failed",
        description: error.message || "Could not submit deletion request.",
        variant: "destructive",
      });
    },
  });

  const handleConsentChange = (field: keyof typeof consents, value: boolean) => {
    setConsents(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveConsents = () => {
    updateConsentsMutation.mutate(consents);
  };

  const handleExportData = () => {
    if (confirm("This will download all your personal data. Continue?")) {
      exportDataMutation.mutate();
    }
  };

  const handleDeleteData = () => {
    if (confirm("This will permanently delete your account and all associated data. This action cannot be undone. Are you sure?")) {
      deleteDataMutation.mutate();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-almost-black border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            GDPR Privacy Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Consent Status */}
          <div>
            <h4 className="text-white font-semibold mb-3">Current Consent Status</h4>
            {currentConsents?.gdprConsentDate && (
              <p className="text-gray-400 text-sm mb-3">
                Last updated: {new Date(currentConsents.gdprConsentDate).toLocaleDateString()}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-3 bg-black rounded-lg">
                <span className="text-white text-sm">GDPR Compliance</span>
                <Badge variant={consents.gdprConsent ? "default" : "destructive"}>
                  {consents.gdprConsent ? "Consented" : "Required"}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-black rounded-lg">
                <span className="text-white text-sm">Data Processing</span>
                <Badge variant={consents.dataProcessingConsent ? "default" : "destructive"}>
                  {consents.dataProcessingConsent ? "Consented" : "Required"}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-black rounded-lg">
                <span className="text-white text-sm">Marketing</span>
                <Badge variant={consents.marketingConsent ? "default" : "secondary"}>
                  {consents.marketingConsent ? "Consented" : "Declined"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Consent Controls */}
          <div>
            <h4 className="text-white font-semibold mb-3">Update Your Preferences</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="gdpr-consent"
                  checked={consents.gdprConsent}
                  onCheckedChange={(checked) => handleConsentChange('gdprConsent', !!checked)}
                  className="mt-1"
                />
                <div>
                  <label htmlFor="gdpr-consent" className="text-white font-medium cursor-pointer">
                    GDPR Compliance Consent (Required)
                  </label>
                  <p className="text-gray-400 text-sm">
                    I consent to the processing of my personal data in accordance with GDPR regulations for the purpose of providing coaching services.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="data-processing"
                  checked={consents.dataProcessingConsent}
                  onCheckedChange={(checked) => handleConsentChange('dataProcessingConsent', !!checked)}
                  className="mt-1"
                />
                <div>
                  <label htmlFor="data-processing" className="text-white font-medium cursor-pointer">
                    Data Processing Consent (Required)
                  </label>
                  <p className="text-gray-400 text-sm">
                    I consent to the processing of my data for session management, progress tracking, and payment processing.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="marketing-consent"
                  checked={consents.marketingConsent}
                  onCheckedChange={(checked) => handleConsentChange('marketingConsent', !!checked)}
                  className="mt-1"
                />
                <div>
                  <label htmlFor="marketing-consent" className="text-white font-medium cursor-pointer">
                    Marketing Communications (Optional)
                  </label>
                  <p className="text-gray-400 text-sm">
                    I consent to receiving marketing communications about new services, promotions, and coaching tips.
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleSaveConsents}
              className="mt-4 bg-lfc-red hover:bg-bright-red text-white"
              disabled={updateConsentsMutation.isPending}
            >
              {updateConsentsMutation.isPending ? "Saving..." : "Save Preferences"}
            </Button>
          </div>

          {/* GDPR Rights */}
          <div>
            <h4 className="text-white font-semibold mb-3">Your GDPR Rights</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={handleExportData}
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-700 justify-start"
                disabled={exportDataMutation.isPending}
              >
                <Download className="w-4 h-4 mr-2" />
                {exportDataMutation.isPending ? "Exporting..." : "Download My Data"}
              </Button>

              <Button
                onClick={() => window.open('/privacy-policy', '_blank')}
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-700 justify-start"
              >
                <FileText className="w-4 h-4 mr-2" />
                View Privacy Policy
              </Button>

              <Button
                onClick={() => window.open('/data-processing', '_blank')}
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-700 justify-start"
              >
                <Eye className="w-4 h-4 mr-2" />
                Data Processing Info
              </Button>

              <Button
                onClick={handleDeleteData}
                variant="outline"
                className="border-red-600 text-red-400 hover:bg-red-950 justify-start"
                disabled={deleteDataMutation.isPending}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {deleteDataMutation.isPending ? "Processing..." : "Delete My Account"}
              </Button>
            </div>
          </div>

          {/* Legal Information */}
          <div className="bg-black p-4 rounded-lg">
            <h5 className="text-white font-semibold mb-2">Your Rights Under GDPR</h5>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• Right to access your personal data</li>
              <li>• Right to rectification (correction) of your data</li>
              <li>• Right to erasure ("right to be forgotten")</li>
              <li>• Right to restrict processing</li>
              <li>• Right to data portability</li>
              <li>• Right to object to processing</li>
              <li>• Right to withdraw consent at any time</li>
            </ul>
            <p className="text-gray-400 text-xs mt-3">
              For any privacy concerns or to exercise your rights, contact our Data Protection Officer at privacy@all-4one-coaching.com
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}