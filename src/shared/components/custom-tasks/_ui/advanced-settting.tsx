import React from 'react';
import { Card, CardContent, CardDescription, CardTitle, CardHeader } from '../../ui/card';
import { Label } from '../../ui/label';
import { Tabs, TabsList, TabsTrigger } from '../../ui/tabs';
import { TabsContent } from '../../ui/tabs';
import { Switch } from '../../ui/switch';



export const AdvancedSetting = () => {


  return (
    <Card>
        <CardHeader>
          <CardTitle>Advanced Settings</CardTitle>
          <CardDescription>Configure optional settings for your test</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="timing">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="timing">Timing</TabsTrigger>
              <TabsTrigger value="scoring">Scoring</TabsTrigger>
              <TabsTrigger value="access">Access</TabsTrigger>
            </TabsList>
            <TabsContent value="timing" className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="time-limit">Time Limit</Label>
                  <p className="text-sm text-muted-foreground">Set a time limit for completing the test</p>
                </div>
                <Switch id="time-limit" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="scheduled">Scheduled Availability</Label>
                  <p className="text-sm text-muted-foreground">Make the test available during specific dates</p>
                </div>
                <Switch id="scheduled" />
              </div>
            </TabsContent>
            <TabsContent value="scoring" className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-grade">Auto Grading</Label>
                  <p className="text-sm text-muted-foreground">Automatically grade objective questions</p>
                </div>
                <Switch id="auto-grade" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="partial-credit">Partial Credit</Label>
                  <p className="text-sm text-muted-foreground">Allow partial credit for partially correct answers</p>
                </div>
                <Switch id="partial-credit" />
              </div>
            </TabsContent>
            <TabsContent value="access" className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="password-protected">Password Protected</Label>
                  <p className="text-sm text-muted-foreground">Require a password to access the test</p>
                </div>
                <Switch id="password-protected" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="public-results">Public Results</Label>
                  <p className="text-sm text-muted-foreground">Make test results visible to all participants</p>
                </div>
                <Switch id="public-results" />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>       
    </Card>
  );
};
